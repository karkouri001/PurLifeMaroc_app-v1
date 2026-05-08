import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { PrestayAuthDto } from './dto/prestay-auth.dto';
import { PrestaySessionDto } from './dto/prestay-session.dto';

type Language = 'en' | 'de';

type EzusUser = {
  email?: string;
  first_name?: string;
  last_name?: string;
  agency?: string;
};

type EzusAlternative = {
  alternative_title?: string;
  is_main?: boolean;
  trip_date_in?: string;
  trip_date_out?: string;
  trip_duration?: number;
  trip_people?: string | number;
  destinations?: unknown[];
};

type EzusProject = {
  error?: boolean | string;
  reference?: string;
  info_number?: string;
  info_title?: string;
  info_stage?: string;
  sales_manager?: EzusUser;
  project_manager?: EzusUser;
  alternatives?: EzusAlternative[];
};

type EzusDocument = {
  title?: string;
  type?: string;
  url?: string;
};

@Injectable()
export class PrestayService {
  constructor(private readonly configService: ConfigService) {}

  async authenticate(input: PrestayAuthDto): Promise<PrestaySessionDto> {
    const hasEzusConfig = this.hasEzusConfig();

    if (!hasEzusConfig) {
      return this.getMockSession(input);
    }

    try {
      const token = await this.loginToEzus();
      const project = await this.getEzusProject(token, input.reservationReference);

      this.assertProjectBelongsToGuest(project, input);

      const documents = await this.getEzusDocuments(token, input.reservationReference);

      return this.toSession(input, project, documents, 'ezus');
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      if (this.allowMockFallback()) {
        return this.getMockSession(input);
      }

      throw new BadGatewayException('Unable to read the reservation system');
    }
  }

  private hasEzusConfig(): boolean {
    return Boolean(
      this.configService.get<string>('EZUS_API_KEY') &&
        this.configService.get<string>('EZUS_EMAIL') &&
        this.configService.get<string>('EZUS_PASSWORD')
    );
  }

  private allowMockFallback(): boolean {
    return this.configService.get<string>('PRESTAY_ALLOW_MOCK', 'true') !== 'false';
  }

  private getBaseUrl(): string {
    return this.configService
      .get<string>('EZUS_API_BASE_URL', 'https://api.ezus.app')
      .replace(/\/+$/, '');
  }

  private async loginToEzus(): Promise<string> {
    const response = await axios.post<{ token?: string; error?: boolean | string }>(
      `${this.getBaseUrl()}/login`,
      {
        email: this.configService.get<string>('EZUS_EMAIL'),
        password: this.configService.get<string>('EZUS_PASSWORD'),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.configService.get<string>('EZUS_API_KEY'),
        },
        timeout: 8000,
      }
    );

    if (this.isEzusError(response.data.error) || !response.data.token) {
      throw new BadGatewayException('Ezus login failed');
    }

    return response.data.token;
  }

  private async getEzusProject(
    token: string,
    reservationReference: string
  ): Promise<EzusProject> {
    const response = await axios.get<EzusProject>(`${this.getBaseUrl()}/project`, {
      headers: this.getEzusHeaders(token),
      params: { reference: reservationReference },
      timeout: 8000,
    });

    if (this.isEzusError(response.data.error) || !response.data.reference) {
      throw new UnauthorizedException('Reservation not found');
    }

    return response.data;
  }

  private async getEzusDocuments(
    token: string,
    reservationReference: string
  ): Promise<EzusDocument[]> {
    try {
      const response = await axios.get<{ documents?: EzusDocument[] }>(
        `${this.getBaseUrl()}/project-documents`,
        {
          headers: this.getEzusHeaders(token),
          params: { reference: reservationReference },
          timeout: 8000,
        }
      );

      return Array.isArray(response.data.documents) ? response.data.documents : [];
    } catch {
      return [];
    }
  }

  private getEzusHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
      'x-api-key': this.configService.get<string>('EZUS_API_KEY'),
    };
  }

  private isEzusError(value: boolean | string | undefined): boolean {
    return value === true || value === 'true';
  }

  private assertProjectBelongsToGuest(
    project: EzusProject,
    input: PrestayAuthDto
  ) {
    const expectedEmail = input.email.trim().toLowerCase();
    const expectedLastName = input.lastName?.trim().toLowerCase();
    const records = this.collectObjects(project);
    const emails = this.collectValuesByKey(records, (key) => key.includes('email'));
    const lastNames = this.collectValuesByKey((records), (key) =>
      ['last_name', 'lastname', 'surname', 'family_name', 'lastName'].includes(key)
    );

    if (emails.length > 0 && !emails.includes(expectedEmail)) {
      throw new UnauthorizedException('Reservation does not match this email');
    }

    if (expectedLastName && lastNames.length > 0 && !lastNames.includes(expectedLastName)) {
      throw new UnauthorizedException('Reservation does not match this guest name');
    }

    if (
      emails.length === 0 &&
      this.configService.get<string>('PRESTAY_REQUIRE_EZUS_GUEST_MATCH') === 'true'
    ) {
      throw new UnauthorizedException('Reservation guest data is incomplete');
    }
  }

  private collectObjects(value: unknown, output: Record<string, unknown>[] = []) {
    if (!value || typeof value !== 'object') {
      return output;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => this.collectObjects(item, output));
      return output;
    }

    const record = value as Record<string, unknown>;
    output.push(record);
    Object.values(record).forEach((item) => this.collectObjects(item, output));
    return output;
  }

  private collectValuesByKey(
    records: Record<string, unknown>[],
    matchesKey: (key: string) => boolean
  ) {
    return records
      .flatMap((record) =>
        Object.entries(record)
          .filter(([key, value]) => matchesKey(key) && typeof value === 'string')
          .map(([, value]) => String(value).trim().toLowerCase())
      )
      .filter(Boolean);
  }

  private toSession(
    input: PrestayAuthDto,
    project: EzusProject,
    ezusDocuments: EzusDocument[],
    source: 'ezus' | 'mock'
  ): PrestaySessionDto {
    const alternative = this.getMainAlternative(project);
    const documents = this.mapDocuments(input.language, ezusDocuments);
    const manager = project.project_manager || project.sales_manager || {};
    const guest = this.getGuestFromProject(input, project);
    const startDate = alternative?.trip_date_in || this.addDays(18);
    const endDate = alternative?.trip_date_out || this.addDays(25);
    const destinations = this.extractDestinations(alternative);

    return {
      token: `${source}-${randomBytes(12).toString('hex')}`,
      source,
      language: input.language,
      guest,
      reservation: {
        reference: project.reference || input.reservationReference,
        title: project.info_title || alternative?.alternative_title || 'Pur Life Maroc Stay',
        status: project.info_stage || 'Confirmed',
        startDate,
        endDate,
        durationLabel: this.getDurationLabel(input.language, alternative, startDate, endDate),
        destinations: destinations.length > 0 ? destinations : ['Marrakesh', 'Essaouira'],
        travelersLabel: this.getTravelersLabel(input.language, alternative),
        managerName: this.getUserName(manager, 'Pur Life Maroc Concierge'),
        managerEmail: manager.email || 'inside@purlife-maroc.com',
      },
      days: this.getPreStayDays(input.language),
      documents,
      services: this.getServices(),
      checklist: this.getChecklist(),
      generatedAt: new Date().toISOString(),
    };
  }

  private getMockSession(input: PrestayAuthDto): PrestaySessionDto {
    return this.toSession(
      input,
      {
        reference: input.reservationReference || 'PLM-DEMO-2026',
        info_title: 'Pur Life Maroc Private Stay',
        info_stage: 'Confirmed',
        project_manager: {
          email: 'inside@purlife-maroc.com',
          first_name: 'Pur Life Maroc',
          last_name: 'Concierge',
        },
        alternatives: [
          {
            alternative_title: 'Marrakesh and Atlantic Coast',
            is_main: true,
            trip_date_in: this.addDays(18),
            trip_date_out: this.addDays(25),
            trip_duration: 7,
            trip_people: '2',
            destinations: [
              { name: 'Morocco', subdestination_name: 'Marrakesh' },
              { name: 'Morocco', subdestination_name: 'Essaouira' },
            ],
          },
        ],
      },
      [],
      'mock'
    );
  }

  private getMainAlternative(project: EzusProject): EzusAlternative | undefined {
    return (
      project.alternatives?.find((alternative) => alternative.is_main) ||
      project.alternatives?.[0]
    );
  }

  private getGuestFromProject(
    input: PrestayAuthDto,
    project: EzusProject
  ): PrestaySessionDto['guest'] {
    const expectedEmail = input.email.trim().toLowerCase();
    const matchingRecord = this.collectObjects(project).find((record) =>
      Object.entries(record).some(
        ([key, value]) =>
          key.toLowerCase().includes('email') &&
          typeof value === 'string' &&
          value.trim().toLowerCase() === expectedEmail
      )
    );

    return {
      firstName: this.readString(matchingRecord, 'first_name') || 'Private',
      lastName:
        this.readString(matchingRecord, 'last_name') ||
        input.lastName?.trim() ||
        'Guest',
      email: input.email.trim(),
    };
  }

  private readString(record: Record<string, unknown> | undefined, key: string) {
    const value = record?.[key];
    return typeof value === 'string' && value.trim() ? value.trim() : undefined;
  }

  private getUserName(user: EzusUser, fallback: string): string {
    const name = [user.first_name, user.last_name].filter(Boolean).join(' ').trim();
    return name || fallback;
  }

  private extractDestinations(alternative: EzusAlternative | undefined): string[] {
    const names = new Set<string>();
    const addNames = (value: unknown) => {
      if (!value || typeof value !== 'object') {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach(addNames);
        return;
      }

      const record = value as Record<string, unknown>;
      ['subdestination_name', 'destination_name', 'name'].forEach((key) => {
        const item = record[key];
        if (typeof item === 'string' && item.trim() && item !== 'Morocco') {
          names.add(item.trim());
        }
      });
      Object.values(record).forEach(addNames);
    };

    addNames(alternative?.destinations);
    return Array.from(names);
  }

  private getDurationLabel(
    language: Language,
    alternative: EzusAlternative | undefined,
    startDate: string,
    endDate: string
  ): string {
    if (alternative?.trip_duration) {
      return language === 'de'
        ? `${alternative.trip_duration} Tage`
        : `${alternative.trip_duration} days`;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(
      1,
      Math.round((end.getTime() - start.getTime()) / 86400000)
    );

    return language === 'de' ? `${days} Tage` : `${days} days`;
  }

  private getTravelersLabel(
    language: Language,
    alternative: EzusAlternative | undefined
  ): string {
    const people = alternative?.trip_people ? String(alternative.trip_people) : '2';
    return language === 'de' ? `${people} Gaeste` : `${people} guests`;
  }

  private mapDocuments(language: Language, documents: EzusDocument[]) {
    if (documents.length === 0) {
      return [
        {
          id: 'program',
          title: language === 'de' ? 'Reiseprogramm' : 'Travel program',
          type: 'program',
        },
        {
          id: 'arrival',
          title: language === 'de' ? 'Ankunftsnotizen' : 'Arrival notes',
          type: 'arrival',
        },
      ];
    }

    return documents.map((document, index) => ({
      id: `document-${index + 1}`,
      title: document.title || (language === 'de' ? 'Dokument' : 'Document'),
      type: document.type || 'document',
      url: document.url,
    }));
  }

  private getPreStayDays(language: Language) {
    return [
      {
        id: 'arrival',
        labelEn: 'Before arrival',
        labelDe: 'Vor Anreise',
        titleEn: 'Confirm arrival details',
        titleDe: 'Ankunftsdaten bestaetigen',
        textEn:
          'Share flight time, passport names, and transfer preferences so the concierge can prepare a smooth arrival.',
        textDe:
          'Teilen Sie Flugzeit, Passnamen und Transferwuensche, damit der Concierge die Ankunft sauber vorbereiten kann.',
      },
      {
        id: 'preferences',
        labelEn: 'Stay rhythm',
        labelDe: 'Aufenthaltsrhythmus',
        titleEn: 'Shape the stay details',
        titleDe: 'Aufenthaltsdetails formen',
        textEn:
          'Review dining wishes, wellness interests, guide needs, and any room notes before final timing is locked.',
        textDe:
          'Pruefen Sie Dining-Wuensche, Wellness-Interessen, Guide-Bedarf und Zimmerhinweise vor der finalen Abstimmung.',
      },
      {
        id: 'services',
        labelEn: 'Services',
        labelDe: 'Services',
        titleEn: 'Keep services visible',
        titleDe: 'Services im Blick behalten',
        textEn:
          'Use the app as a compact pre-stay companion for concierge, chauffeur, activities, living, and dining context.',
        textDe:
          'Nutzen Sie die App als kompakten Pre-Stay-Begleiter fuer Concierge, Chauffeur, Aktivitaeten, Living und Dining.',
      },
    ].filter(() => language === 'en' || language === 'de');
  }

  private getServices() {
    return [
      {
        id: 'concierge',
        titleEn: 'Private Concierge',
        titleDe: 'Private Concierge',
        textEn:
          'Ask for restaurant timing, local etiquette, shopping guidance, special occasions, and final refinements.',
        textDe:
          'Fragen Sie nach Restaurantzeiten, lokaler Etikette, Shopping-Hinweisen, besonderen Anlaessen und letzten Details.',
        actionEn: 'Message concierge',
        actionDe: 'Concierge kontaktieren',
        route: '/(app)/enquiry',
      },
      {
        id: 'arrival',
        titleEn: 'Arrival and chauffeur',
        titleDe: 'Ankunft und Chauffeur',
        textEn:
          'Keep transfer details, luggage notes, and pick-up preferences visible before arrival.',
        textDe:
          'Transferdetails, Gepaeckhinweise und Abholwuensche bleiben vor der Ankunft sichtbar.',
        actionEn: 'Review transfer',
        actionDe: 'Transfer pruefen',
      },
      {
        id: 'living',
        titleEn: 'Pur Life Living',
        titleDe: 'Pur Life Living',
        textEn:
          'See stay context, preferred room notes, arrival rhythm, and service expectations.',
        textDe:
          'Sehen Sie Unterkunftskontext, Zimmerhinweise, Ankunftsrhythmus und Service-Erwartungen.',
        actionEn: 'Open stays',
        actionDe: 'Unterkuenfte ansehen',
        route: '/(app)/accommodation-list',
      },
    ];
  }

  private getChecklist() {
    return [
      {
        id: 'identity',
        titleEn: 'Passport names',
        titleDe: 'Passnamen',
        textEn: 'Check spelling for all travelers before final documents are prepared.',
        textDe:
          'Pruefen Sie die Schreibweise aller Reisenden vor finalen Dokumenten.',
        done: false,
      },
      {
        id: 'arrival-time',
        titleEn: 'Arrival time',
        titleDe: 'Ankunftszeit',
        textEn: 'Share flight, train, or driver timing with the concierge.',
        textDe: 'Teilen Sie Flug-, Zug- oder Fahrerzeiten mit dem Concierge.',
        done: false,
      },
      {
        id: 'preferences',
        titleEn: 'Stay preferences',
        titleDe: 'Aufenthaltswuensche',
        textEn:
          'Mention dietary notes, room rhythm, celebrations, and wellness interests.',
        textDe:
          'Nennen Sie Ernaehrungshinweise, Zimmer-Rhythmus, Feiern und Wellness-Interessen.',
        done: false,
      },
    ];
  }

  private addDays(days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  }
}
