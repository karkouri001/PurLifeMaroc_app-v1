import {
  activities,
  accommodations,
  destinations,
  restaurants,
  travelStyles,
} from '../data/mockData';
import { privateChauffeurs, signatureItineraries } from '../data/conciergeData';
import { companyInfo } from '../data/companyInfo';
import {
  chauffeurDetails,
  destinationInsights,
  itineraryDetails,
} from '../data/contentDetails';
import { ChatMessage } from '../types';

type ChatbotLanguage = 'en' | 'de';

export class ChatbotService {
  constructor(private language: ChatbotLanguage = 'en') {}

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  private hasAny(text: string, keywords: string[]): boolean {
    return keywords.some((keyword) => text.includes(this.normalize(keyword)));
  }

  private getDestinationName(destinationId: string): string {
    const destination = destinations.find((item) => item.id === destinationId);

    if (!destination) {
      return destinationId;
    }

    return this.language === 'de' ? destination.nameDe : destination.nameEn;
  }

  private joinList(items: string[]): string {
    return items.join(', ');
  }

  private matchDestination(text: string) {
    return destinations.find((destination) =>
      [destination.id, destination.nameEn, destination.nameDe].some((value) =>
        text.includes(this.normalize(value))
      )
    );
  }

  private matchActivity(text: string) {
    return activities.find((activity) =>
      [activity.id, activity.nameEn, activity.nameDe].some((value) =>
        text.includes(this.normalize(value))
      )
    );
  }

  private matchAccommodation(text: string) {
    return accommodations.find((accommodation) =>
      [accommodation.id, accommodation.nameEn, accommodation.nameDe].some((value) =>
        text.includes(this.normalize(value))
      )
    );
  }

  private matchRestaurant(text: string) {
    return restaurants.find((restaurant) =>
      [restaurant.id, restaurant.nameEn, restaurant.nameDe].some((value) =>
        text.includes(this.normalize(value))
      )
    );
  }

  private matchTravelStyle(text: string) {
    return travelStyles.find((style) =>
      [style.id, style.nameEn, style.nameDe].some((value) =>
        text.includes(this.normalize(value))
      )
    );
  }

  private matchDriver(text: string) {
    return privateChauffeurs.find((driver) =>
      [driver.id, driver.name, driver.baseCity].some((value) =>
        text.includes(this.normalize(value))
      )
    );
  }

  private matchItinerary(text: string) {
    return signatureItineraries.find((itinerary) =>
      [itinerary.id, itinerary.nameEn, itinerary.nameDe, itinerary.themeEn, itinerary.themeDe].some(
        (value) => text.includes(this.normalize(value))
      )
    );
  }

  private buildBrandOverviewResponse(): string {
    const about =
      this.language === 'de' ? companyInfo.aboutDe : companyInfo.aboutEn;
    const trustSignals = this.language === 'de'
      ? companyInfo.trustSignalsDe.slice(0, 3)
      : companyInfo.trustSignalsEn.slice(0, 3);

    return `${about} ${
      this.language === 'de'
        ? `Die Marke betont besonders ${this.joinList(trustSignals)}.`
        : `The brand especially emphasizes ${this.joinList(trustSignals)}.`
    }`;
  }

  private buildServicesResponse(): string {
    const services =
      this.language === 'de'
        ? companyInfo.servicesDe.slice(0, 5)
        : companyInfo.servicesEn.slice(0, 5);

    return this.language === 'de'
      ? `Pur Life Maroc deckt vor allem diese Bereiche ab: ${this.joinList(
          services
        )}.`
      : `Pur Life Maroc mainly covers these areas: ${this.joinList(services)}.`;
  }

  private buildExpertsResponse(): string {
    const experts = companyInfo.experts
      .map((expert) =>
        `${expert.name} (${this.language === 'de' ? expert.roleDe : expert.roleEn})`
      )
      .join(', ');

    return this.language === 'de'
      ? `Die offizielle Website stellt diese Experten heraus: ${experts}.`
      : `The official site highlights these experts: ${experts}.`;
  }

  private buildContactResponse(): string {
    return this.language === 'de'
      ? `Du erreichst Pur Life Maroc ueber ${companyInfo.contactOffice.email}. Das Marokko-Buero nennt ${companyInfo.moroccoOffice.phone} und ${companyInfo.moroccoOffice.email}; die Europa-Repraesentanz ist unter ${companyInfo.europeOffice.phone} erreichbar.`
      : `You can reach Pur Life Maroc at ${companyInfo.contactOffice.email}. The Morocco office lists ${companyInfo.moroccoOffice.phone} and ${companyInfo.moroccoOffice.email}; the European representative can be reached at ${companyInfo.europeOffice.phone}.`;
  }

  private buildEmailFlowResponse(): string {
    return this.language === 'de'
      ? companyInfo.appEmailFlowDe
      : companyInfo.appEmailFlowEn;
  }

  private buildTrustResponse(): string {
    const trustSignals = this.language === 'de'
      ? companyInfo.trustSignalsDe
      : companyInfo.trustSignalsEn;

    return this.language === 'de'
      ? `Pur Life Maroc betont vor allem: ${this.joinList(trustSignals)}.`
      : `Pur Life Maroc especially emphasizes: ${this.joinList(trustSignals)}.`;
  }

  private buildPrivateConciergeResponse(): string {
    return this.language === 'de'
      ? `${companyInfo.privateConciergeDe} Die Website beschreibt den Concierge ausserdem als Quelle fuer Insider-Tipps, Restaurantorganisation, lokale Kommunikation und individuell kuratierte Tagesplanung.`
      : `${companyInfo.privateConciergeEn} The site also describes the concierge as a source of insider tips, restaurant coordination, local communication help, and tailor-made day planning.`;
  }

  private buildPrivateChauffeurResponse(): string {
    return this.language === 'de'
      ? `${companyInfo.privateChauffeurDe} Die Website verweist dabei auf flexible Stadtfahrten, laengere Transfers und die Kombination mit einem Private Concierge.`
      : `${companyInfo.privateChauffeurEn} The site highlights flexible city rides, longer transfers, and pairing the chauffeur with a private concierge.`;
  }

  private buildDestinationsCatalogResponse(): string {
    const names = destinations.map((destination) =>
      this.language === 'de' ? destination.nameDe : destination.nameEn
    );

    return this.language === 'de'
      ? `Im App-Katalog stehen aktuell diese Ziele im Fokus: ${this.joinList(names)}.`
      : `These destinations are currently in focus in the app catalog: ${this.joinList(names)}.`;
  }

  private buildActivityCatalogResponse(): string {
    const names = activities
      .slice(0, 8)
      .map((activity) => (this.language === 'de' ? activity.nameDe : activity.nameEn));

    return this.language === 'de'
      ? `Zu den markanten App-Aktivitaeten gehoeren ${this.joinList(names)}.`
      : `Some of the standout app activities are ${this.joinList(names)}.`;
  }

  private buildTravelStyleResponse(text: string): string {
    const style = this.matchTravelStyle(text);

    if (!style) {
      return this.language === 'de'
        ? 'Die App arbeitet mit vier Reisestilen: The Curator, The Culturist, The Urbanite und The Nomad.'
        : 'The app works with four travel styles: The Curator, The Culturist, The Urbanite, and The Nomad.';
    }

    return this.language === 'de'
      ? `${style.nameDe}: ${style.descriptionDe}`
      : `${style.nameEn}: ${style.descriptionEn}`;
  }

  private buildDestinationOverviewResponse(destinationId: string): string {
    const destination = destinations.find((item) => item.id === destinationId);

    if (!destination) {
      return this.defaultResponse();
    }

    const extra = destinationInsights[destination.id as keyof typeof destinationInsights];
    const name = this.language === 'de' ? destination.nameDe : destination.nameEn;
    const description = this.language === 'de' ? destination.descriptionDe : destination.descriptionEn;
    const mood = extra ? (this.language === 'de' ? extra.moodDe : extra.moodEn) : '';

    return this.language === 'de'
      ? `${name}: ${description} Beste Reisezeit: ${destination.bestSeason}. Stimmung: ${mood}.`
      : `${name}: ${description} Best season: ${destination.bestSeason}. Mood: ${mood}.`;
  }

  private buildDestinationActivitiesResponse(destinationId: string): string {
    const destination = destinations.find((item) => item.id === destinationId);
    const related = activities.filter((item) => item.destination === destinationId).slice(0, 4);

    if (!destination || related.length === 0) {
      return this.defaultResponse();
    }

    const list = related
      .map((item) => (this.language === 'de' ? item.nameDe : item.nameEn))
      .join(', ');

    return this.language === 'de'
      ? `In ${destination.nameDe} passen besonders gut: ${list}.`
      : `In ${destination.nameEn}, strong activity picks are ${list}.`;
  }

  private buildDestinationStayResponse(destinationId: string): string {
    const destination = destinations.find((item) => item.id === destinationId);
    const related = accommodations.filter((item) => item.destination === destinationId).slice(0, 3);

    if (!destination || related.length === 0) {
      return this.defaultResponse();
    }

    const list = related
      .map((item) => `${this.language === 'de' ? item.nameDe : item.nameEn} (${item.pricePerNight})`)
      .join(', ');

    return this.language === 'de'
      ? `Fuer ${destination.nameDe} sind in der App gute Stay-Optionen: ${list}.`
      : `For ${destination.nameEn}, strong stay options in the app include ${list}.`;
  }

  private buildDestinationDiningResponse(destinationId: string): string {
    const destination = destinations.find((item) => item.id === destinationId);
    const related = restaurants.filter((item) => item.destination === destinationId).slice(0, 3);

    if (!destination || related.length === 0) {
      return this.defaultResponse();
    }

    const list = related
      .map((item) => (this.language === 'de' ? item.nameDe : item.nameEn))
      .join(', ');

    return this.language === 'de'
      ? `Fuer Dining in ${destination.nameDe} kannst du mit ${list} starten.`
      : `For dining in ${destination.nameEn}, you can start with ${list}.`;
  }

  private buildActivityResponse(text: string): string {
    const activity = this.matchActivity(text);

    if (!activity) {
      const destination = this.matchDestination(text);
      if (destination) {
        return this.buildDestinationActivitiesResponse(destination.id);
      }

      return this.buildActivityCatalogResponse();
    }

    const destinationName = this.getDestinationName(activity.destination);
    const name = this.language === 'de' ? activity.nameDe : activity.nameEn;
    const description = this.language === 'de' ? activity.descriptionDe : activity.descriptionEn;

    return this.language === 'de'
      ? `${name} in ${destinationName}: ${description} Dauer: ${activity.duration}. Preis: ${activity.priceRange}.`
      : `${name} in ${destinationName}: ${description} Duration: ${activity.duration}. Price: ${activity.priceRange}.`;
  }

  private buildAccommodationResponse(text: string): string {
    const accommodation = this.matchAccommodation(text);

    if (!accommodation) {
      const destination = this.matchDestination(text);
      if (destination) {
        return this.buildDestinationStayResponse(destination.id);
      }

      return this.language === 'de'
        ? 'Ich kann Unterkuenfte nach Stadt oder nach Stil wie Boutique, Camp oder Luxury ordnen.'
        : 'I can sort stays by city or by style such as boutique, camp, or luxury.';
    }

    const name = this.language === 'de' ? accommodation.nameDe : accommodation.nameEn;
    const description =
      this.language === 'de' ? accommodation.descriptionDe : accommodation.descriptionEn;

    return this.language === 'de'
      ? `${name}: ${description} Preis pro Nacht: ${accommodation.pricePerNight}. Ausstattung: ${accommodation.amenities.slice(0, 4).join(', ')}.`
      : `${name}: ${description} Price per night: ${accommodation.pricePerNight}. Amenities: ${accommodation.amenities.slice(0, 4).join(', ')}.`;
  }

  private buildFoodResponse(text: string): string {
    const restaurant = this.matchRestaurant(text);

    if (restaurant) {
      const name = this.language === 'de' ? restaurant.nameDe : restaurant.nameEn;
      const description = this.language === 'de' ? restaurant.descriptionDe : restaurant.descriptionEn;

      return this.language === 'de'
        ? `${name}: ${description} Spezialitaeten: ${restaurant.specialties.slice(0, 3).join(', ')}. Preisrahmen: ${restaurant.priceRange}.`
        : `${name}: ${description} Signature dishes: ${restaurant.specialties.slice(0, 3).join(', ')}. Price range: ${restaurant.priceRange}.`;
    }

    const destination = this.matchDestination(text);
    if (destination) {
      return this.buildDestinationDiningResponse(destination.id);
    }

    return this.language === 'de'
      ? 'Ich kann Dining-Ideen nach Stadt geben, zum Beispiel fuer Essaouira, Marrakesch oder Fes.'
      : 'I can suggest dining ideas city by city, for example in Essaouira, Marrakesh, or Fez.';
  }

  private buildDriverResponse(text: string): string {
    const driver = this.matchDriver(text);

    if (!driver) {
      return this.buildPrivateChauffeurResponse();
    }

    const detail = chauffeurDetails[driver.id as keyof typeof chauffeurDetails];
    const summary = this.language === 'de' ? driver.summaryDe : driver.summaryEn;
    const vehicle = this.language === 'de' ? driver.vehicleDe : driver.vehicleEn;
    const bestFor = detail ? (this.language === 'de' ? detail.idealForDe : detail.idealForEn) : '';

    return this.language === 'de'
      ? `In der App ist ${driver.name} das Profil fuer ${driver.baseCity}: ${summary} Fahrzeug: ${vehicle}. Gut passend fuer: ${bestFor}`
      : `Inside the app, ${driver.name} is the profile for ${driver.baseCity}: ${summary} Vehicle: ${vehicle}. Best for: ${bestFor}`;
  }

  private buildItineraryResponse(text: string): string {
    const matchedItinerary = this.matchItinerary(text);
    const matchedDestination = this.matchDestination(text);

    const itinerary =
      matchedItinerary ||
      (matchedDestination
        ? signatureItineraries.find((item) => item.destinations.includes(matchedDestination.id))
        : undefined) ||
      signatureItineraries[0];

    if (!itinerary) {
      return this.defaultResponse();
    }

    const detail = itineraryDetails[itinerary.id as keyof typeof itineraryDetails];
    const title = this.language === 'de' ? itinerary.nameDe : itinerary.nameEn;
    const route = itinerary.destinations.map((id) => this.getDestinationName(id)).join(' - ');
    const idealFor = detail ? (this.language === 'de' ? detail.idealForDe : detail.idealForEn) : '';

    return this.language === 'de'
      ? `${title}: Route ${route}. Dauer: ${itinerary.duration}. Geeignet fuer: ${idealFor}`
      : `${title}: Route ${route}. Duration: ${itinerary.duration}. Good for: ${idealFor}`;
  }

  private buildBookingResponse(): string {
    return this.language === 'de'
      ? `Die App verarbeitet keine direkten Buchungen oder Live-Verfuegbarkeiten. Stattdessen bereitet sie einen menschlichen Follow-up vor: zuerst lokal speichern und danach versuchen, den echten E-Mail-Entwurf an ${companyInfo.contactOffice.email} zu oeffnen. Gesendet wird er nur in Ihrer Mail-App.`
      : `The app does not process direct bookings or live availability. Instead, it prepares a human follow-up: it stores the request locally and then tries to open the real email draft to ${companyInfo.contactOffice.email}. It is only sent from your mail app.`;
  }

  private defaultResponse(): string {
    return this.language === 'de'
      ? 'Ich kann zu Pur Life Maroc selbst, zu den Services, zum E-Mail-Ablauf, zu Zielen, Dining, Unterkuenften, Aktivitaeten, Chauffeuren und Routen antworten.'
      : 'I can answer about Pur Life Maroc itself, the services, the email flow, destinations, dining, stays, activities, chauffeurs, and routes.';
  }

  getSuggestedPrompts(): string[] {
    return this.language === 'de'
      ? [
          'Was bietet Pur Life Maroc eigentlich an?',
          'Wie funktioniert der E-Mail-Ablauf in der App?',
          'Was ist der Unterschied zwischen Private Concierge und Private Chauffeur?',
          'Welche Route passt zu Marrakesch und Fes?',
        ]
      : [
          'What does Pur Life Maroc actually offer?',
          'How does the email flow in the app work?',
          'What is the difference between private concierge and private chauffeur?',
          'Which route fits Marrakesh and Fez?',
        ];
  }

  getFollowUpPrompts(userMessage: string): string[] {
    const text = this.normalize(userMessage);

    if (this.hasAny(text, ['email', 'submit', 'draft', 'message', 'contact form'])) {
      return this.language === 'de'
        ? [
            'An welche Adresse geht die E-Mail?',
            'Wird die Anfrage sofort verschickt?',
            'Kann ich danach noch mit dem Concierge sprechen?',
          ]
        : [
            'Which address does the email go to?',
            'Is the request sent immediately?',
            'Can I still talk to the concierge afterwards?',
          ];
    }

    if (this.hasAny(text, ['service', 'offer', 'about', 'company', 'who are you'])) {
      return this.language === 'de'
        ? [
            'Wer sind die Experten hinter Pur Life Maroc?',
            'Warum sollte ich der Marke vertrauen?',
            'Wie erreiche ich Pur Life Maroc?',
          ]
        : [
            'Who are the experts behind Pur Life Maroc?',
            'Why should I trust the brand?',
            'How do I contact Pur Life Maroc?',
          ];
    }

    if (this.hasAny(text, ['concierge', 'chauffeur', 'driver', 'transfer'])) {
      return this.language === 'de'
        ? [
            'Was macht der Private Concierge genau?',
            'Was macht der Private Chauffeur genau?',
            'Welche App-Profile passen zu Essaouira?',
          ]
        : [
            'What exactly does the private concierge do?',
            'What exactly does the private chauffeur do?',
            'Which app profiles fit Essaouira?',
          ];
    }

    if (this.hasAny(text, ['route', 'itinerary', 'trip', 'reise'])) {
      return this.language === 'de'
        ? [
            'Welche Orte liegen auf der Route?',
            'Welche Unterkuenfte passen zur Route?',
            'Welche Route ist entspannter?',
          ]
        : [
            'Which places are on that route?',
            'Which stays fit that route?',
            'Which route feels more relaxed?',
          ];
    }

    if (this.hasAny(text, ['destination', 'marrakesh', 'essaouira', 'fez', 'agadir'])) {
      return this.language === 'de'
        ? [
            'Welche Aktivitaeten passen dort?',
            'Wo sollte ich dort wohnen?',
            'Was sollte ich dort essen?',
          ]
        : [
            'Which activities fit there?',
            'Where should I stay there?',
            'What should I eat there?',
          ];
    }

    return this.getSuggestedPrompts();
  }

  generateResponse(userMessage: string): ChatMessage {
    const text = this.normalize(userMessage);
    let responseText = this.defaultResponse();

    if (this.hasAny(text, ['hello', 'hi', 'hey', 'hallo', 'bonjour'])) {
      responseText =
        this.language === 'de'
          ? 'Willkommen bei Pur Life Maroc. Ich kann sowohl zur Marke und ihren Services als auch zu den Inhalten der App antworten.'
          : 'Welcome to Pur Life Maroc. I can answer both about the brand and services, and about the app content.';
    } else if (this.hasAny(text, ['what is pur life maroc', 'about pur life', 'who are you'])) {
      responseText = this.buildBrandOverviewResponse();
    } else if (this.hasAny(text, ['service', 'offer', 'what do you offer', 'what do they offer'])) {
      responseText = this.buildServicesResponse();
    } else if (this.hasAny(text, ['expert', 'team', 'owner', 'naima', 'said'])) {
      responseText = this.buildExpertsResponse();
    } else if (this.hasAny(text, ['trust', 'safe', 'why choose', 'why trust', 'sustainable'])) {
      responseText = this.buildTrustResponse();
    } else if (this.hasAny(text, ['concierge'])) {
      responseText = this.buildPrivateConciergeResponse();
    } else if (this.hasAny(text, ['chauffeur', 'driver', 'transfer', 'km adventures'])) {
      responseText = this.buildDriverResponse(text);
    } else if (this.hasAny(text, ['email', 'submit', 'draft', 'message', 'contact form'])) {
      responseText = this.buildEmailFlowResponse();
    } else if (this.hasAny(text, ['contact', 'phone', 'agency', 'office'])) {
      responseText = this.buildContactResponse();
    } else if (this.hasAny(text, ['book', 'booking', 'reserve', 'reservation', 'buch', 'reserv'])) {
      responseText = this.buildBookingResponse();
    } else if (this.hasAny(text, ['route', 'itinerary', 'journey idea', 'trip idea', 'reise'])) {
      responseText = this.buildItineraryResponse(text);
    } else if (this.hasAny(text, ['travel style', 'reisestil', 'curator', 'culturist', 'urbanite', 'nomad'])) {
      responseText = this.buildTravelStyleResponse(text);
    } else if (this.hasAny(text, ['all destinations', 'which destinations', 'destinations list'])) {
      responseText = this.buildDestinationsCatalogResponse();
    } else if (this.hasAny(text, ['all activities', 'which activities', 'activity list'])) {
      responseText = this.buildActivityCatalogResponse();
    } else if (this.hasAny(text, ['food', 'eat', 'drink', 'restaurant', 'cuisine', 'essen', 'trinken'])) {
      responseText = this.buildFoodResponse(text);
    } else if (this.hasAny(text, ['stay', 'hotel', 'riad', 'camp', 'unterkunft', 'accommodation'])) {
      responseText = this.buildAccommodationResponse(text);
    } else if (this.hasAny(text, ['activity', 'activities', 'do in', 'see in', 'experience'])) {
      responseText = this.buildActivityResponse(text);
    } else if (this.matchDestination(text)) {
      responseText = this.buildDestinationOverviewResponse(this.matchDestination(text)!.id);
    } else if (this.matchActivity(text)) {
      responseText = this.buildActivityResponse(text);
    } else if (this.matchAccommodation(text)) {
      responseText = this.buildAccommodationResponse(text);
    } else if (this.matchRestaurant(text)) {
      responseText = this.buildFoodResponse(text);
    } else if (this.matchDriver(text)) {
      responseText = this.buildDriverResponse(text);
    } else if (this.matchItinerary(text)) {
      responseText = this.buildItineraryResponse(text);
    }

    return {
      id: this.generateId(),
      type: 'bot',
      text: responseText,
      timestamp: Date.now(),
    };
  }

  getGreeting(): ChatMessage {
    const greetings =
      this.language === 'de'
        ? [
            'Willkommen bei Pur Life Maroc. Ich kann zur Marke, zu den Services, zu Kontakten, zum E-Mail-Ablauf und zu den App-Inhalten helfen.',
            'Hallo. Frag mich nach Pur Life Maroc, Private Concierge, Private Chauffeur, Zielen, Routen oder dem E-Mail-Flow.',
          ]
        : [
            'Welcome to Pur Life Maroc. I can help with the brand, the services, contacts, the email flow, and the app content.',
            'Hello. Ask me about Pur Life Maroc, private concierge, private chauffeur, destinations, routes, or the email flow.',
          ];

    return {
      id: this.generateId(),
      type: 'bot',
      text: greetings[Math.floor(Math.random() * greetings.length)],
      timestamp: Date.now(),
    };
  }
}

export default ChatbotService;
