import { companyInfo } from '../data/companyInfo';
import type { PreStayLanguage, PreStaySession } from '../types';
import { getContentApiBaseUrl } from './ContentApi';

export type PreStayLoginInput = {
  email: string;
  reservationReference: string;
  lastName?: string;
  language: PreStayLanguage;
};

export const PRESTAY_SESSION_STORAGE_KEY = 'prestaySession';

const today = new Date();
const addDays = (days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const mockPreStaySession = (
  input: Partial<PreStayLoginInput> = {}
): PreStaySession => {
  const language = input.language || 'en';
  const reference = input.reservationReference?.trim() || 'PLM-DEMO-2026';
  const email = input.email?.trim() || 'guest@example.com';
  const lastName = input.lastName?.trim() || 'Guest';

  return {
    token: `mock-${reference}`,
    source: 'mock',
    language,
    guest: {
      firstName: 'Private',
      lastName,
      email,
    },
    reservation: {
      reference,
      title: 'Pur Life Maroc Private Stay',
      status: 'Confirmed',
      startDate: addDays(18),
      endDate: addDays(25),
      durationLabel: '7 nights',
      destinations: ['Marrakesh', 'Essaouira'],
      travelersLabel: '2 guests',
      managerName: 'Pur Life Maroc Concierge',
      managerEmail: companyInfo.contactOffice.email,
    },
    days: [
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
        id: 'marrakesh',
        labelEn: 'Stay focus',
        labelDe: 'Aufenthalt',
        titleEn: 'Marrakesh city rhythm',
        titleDe: 'Marrakesch im richtigen Rhythmus',
        textEn:
          'Review dining wishes, hammam interest, private guide needs, and any shopping or gallery priorities.',
        textDe:
          'Pruefen Sie Dining-Wuensche, Hammam-Interesse, Guide-Bedarf und Prioritaeten fuer Shopping oder Galerien.',
      },
      {
        id: 'essaouira',
        labelEn: 'Coastal days',
        labelDe: 'Kuestentage',
        titleEn: 'Essaouira and Atlantic pace',
        titleDe: 'Essaouira und Atlantiktempo',
        textEn:
          'Keep surf, riding, golf, winery, and relaxed seafood references in one place before the team finalizes timing.',
        textDe:
          'Surf, Reiten, Golf, Weingut und Seafood bleiben als Referenzen gesammelt, bevor das Team das Timing finalisiert.',
      },
    ],
    documents: [
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
    ],
    services: [
      {
        id: 'concierge',
        titleEn: 'Private Concierge',
        titleDe: 'Private Concierge',
        textEn:
          'Ask for restaurant timing, local etiquette, shopping guidance, special occasions, and last refinements.',
        textDe:
          'Fragen Sie nach Restaurantzeiten, lokaler Etikette, Shopping-Hinweisen, besonderen Anlaessen und letzten Details.',
        actionEn: 'Message concierge',
        actionDe: 'Concierge kontaktieren',
        route: '/(app)/enquiry',
      },
      {
        id: 'chauffeur',
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
    ],
    checklist: [
      {
        id: 'identity',
        titleEn: 'Passport names',
        titleDe: 'Passnamen',
        textEn: 'Check spelling for all travelers before final documents are prepared.',
        textDe: 'Pruefen Sie die Schreibweise aller Reisenden vor finalen Dokumenten.',
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
        textEn: 'Mention dietary notes, room rhythm, celebrations, and wellness interests.',
        textDe:
          'Nennen Sie Ernaehrungshinweise, Zimmer-Rhythmus, Feiern und Wellness-Interessen.',
        done: false,
      },
    ],
    generatedAt: new Date().toISOString(),
  };
};

export async function authenticatePreStay(
  input: PreStayLoginInput
): Promise<PreStaySession> {
  try {
    const response = await fetch(`${getContentApiBaseUrl()}/prestay/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Pre-stay auth returned ${response.status}`);
    }

    return (await response.json()) as PreStaySession;
  } catch {
    return mockPreStaySession(input);
  }
}

export default {
  authenticatePreStay,
  mockPreStaySession,
  PRESTAY_SESSION_STORAGE_KEY,
};
