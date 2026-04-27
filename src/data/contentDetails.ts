export type MapPoint = {
  id: string;
  label: string;
  x: number;
  y: number;
  latitude: number;
  longitude: number;
  address?: string;
  googleQuery?: string;
  googleMapsUrl?: string;
};

export type ItineraryFlowStep = {
  id: string;
  titleEn: string;
  titleDe: string;
  textEn: string;
  textDe: string;
  imageType: 'destination' | 'activity';
  imageId: string;
};

export const destinationMapPoints: Record<string, MapPoint> = {
  tangier: {
    id: 'tangier',
    label: 'Tangier',
    x: 22,
    y: 14,
    latitude: 35.7595,
    longitude: -5.834,
    googleQuery: 'Tangier, Morocco',
  },
  chefchaouen: {
    id: 'chefchaouen',
    label: 'Chefchaouen',
    x: 31,
    y: 20,
    latitude: 35.1688,
    longitude: -5.2636,
    googleQuery: 'Chefchaouen, Morocco',
  },
  fez: {
    id: 'fez',
    label: 'Fez',
    x: 42,
    y: 24,
    latitude: 34.0181,
    longitude: -5.0078,
    googleQuery: 'Fez, Morocco',
  },
  rabat: {
    id: 'rabat',
    label: 'Rabat',
    x: 23,
    y: 31,
    latitude: 34.0209,
    longitude: -6.8416,
    googleQuery: 'Rabat, Morocco',
  },
  casablanca: {
    id: 'casablanca',
    label: 'Casablanca',
    x: 20,
    y: 38,
    latitude: 33.5731,
    longitude: -7.5898,
    googleQuery: 'Casablanca, Morocco',
  },
  marrakesh: {
    id: 'marrakesh',
    label: 'Marrakesh',
    x: 28,
    y: 48,
    latitude: 31.6295,
    longitude: -7.9811,
    googleQuery: 'Marrakesh, Morocco',
  },
  essaouira: {
    id: 'essaouira',
    label: 'Essaouira',
    x: 23,
    y: 56,
    latitude: 31.5085,
    longitude: -9.7595,
    googleQuery: 'Essaouira, Morocco',
  },
  agadir: {
    id: 'agadir',
    label: 'Agadir',
    x: 24,
    y: 67,
    latitude: 30.4278,
    longitude: -9.5981,
    googleQuery: 'Agadir, Morocco',
  },
  ouarzazate: {
    id: 'ouarzazate',
    label: 'Ouarzazate',
    x: 43,
    y: 60,
    latitude: 30.9335,
    longitude: -6.937,
    googleQuery: 'Ouarzazate, Morocco',
  },
  agafay: {
    id: 'agafay',
    label: 'Agafay',
    x: 26,
    y: 50,
    latitude: 31.3417,
    longitude: -8.1427,
    googleQuery: 'Agafay Desert, Morocco',
  },
  'atlas-mountains': {
    id: 'atlas-mountains',
    label: 'Atlas Mountains',
    x: 34,
    y: 53,
    latitude: 31.0572,
    longitude: -7.9154,
    googleQuery: 'Atlas Mountains, Morocco',
  },
  'atlantic-coast': {
    id: 'atlantic-coast',
    label: 'Atlantic coast',
    x: 22,
    y: 60,
    latitude: 31.2066,
    longitude: -9.6351,
    googleQuery: 'Atlantic coast, Morocco',
  },
};

export const destinationInsights = {
  essaouira: {
    regionEn: 'Atlantic coast',
    regionDe: 'Atlantikkueste',
    moodEn: 'Slow, artistic, breezy, and ocean-led',
    moodDe: 'Langsam, kuenstlerisch, windig und vom Ozean gepraegt',
    idealForEn: ['Surf lovers', 'Seafood dining', 'Design stays'],
    idealForDe: ['Surf-Fans', 'Seafood Dining', 'Design-Stays'],
  },
  marrakesh: {
    regionEn: 'Central Morocco',
    regionDe: 'Zentralmarokko',
    moodEn: 'Energetic, layered, stylish, and cultural',
    moodDe: 'Energiegeladen, vielschichtig, stilvoll und kulturell',
    idealForEn: ['City breaks', 'Gardens and museums', 'Luxury stays'],
    idealForDe: ['City Breaks', 'Gaerten und Museen', 'Luxus-Stays'],
  },
  fez: {
    regionEn: 'Imperial north-east',
    regionDe: 'Imperialer Nordosten',
    moodEn: 'Historic, intellectual, and immersive',
    moodDe: 'Historisch, intellektuell und immersiv',
    idealForEn: ['Heritage trips', 'Riads', 'Craft discovery'],
    idealForDe: ['Heritage-Reisen', 'Riads', 'Handwerksentdeckung'],
  },
  chefchaouen: {
    regionEn: 'Rif Mountains',
    regionDe: 'Rif-Gebirge',
    moodEn: 'Photogenic, calm, and mountain-framed',
    moodDe: 'Fotogen, ruhig und von Bergen umrahmt',
    idealForEn: ['Short escapes', 'Scenery', 'Soft adventure'],
    idealForDe: ['Kurze Auszeiten', 'Landschaft', 'Sanftes Abenteuer'],
  },
  ouarzazate: {
    regionEn: 'South gateway',
    regionDe: 'Tor zum Sueden',
    moodEn: 'Cinematic, desert-facing, and expansive',
    moodDe: 'Filmartig, wuestenorientiert und weitlaeufig',
    idealForEn: ['Desert routes', 'Kasbahs', 'Adventure stays'],
    idealForDe: ['Wuestenrouten', 'Kasbahs', 'Adventure-Stays'],
  },
  casablanca: {
    regionEn: 'Atlantic metropolis',
    regionDe: 'Atlantische Metropole',
    moodEn: 'Modern, business-friendly, and urban',
    moodDe: 'Modern, businessfreundlich und urban',
    idealForEn: ['Arrival nights', 'Art Deco', 'Urban stops'],
    idealForDe: ['Ankunftsnaechte', 'Art Deco', 'Urban Stops'],
  },
  rabat: {
    regionEn: 'Political capital',
    regionDe: 'Politische Hauptstadt',
    moodEn: 'Refined, calm, and cultural',
    moodDe: 'Raffiniert, ruhig und kulturell',
    idealForEn: ['Museums', 'Elegant city stays', 'Heritage'],
    idealForDe: ['Museen', 'Elegante Stadtaufenthalte', 'Heritage'],
  },
  agadir: {
    regionEn: 'Southern Atlantic coast',
    regionDe: 'Suedliche Atlantikkueste',
    moodEn: 'Sunny, relaxed, and resort-oriented',
    moodDe: 'Sonnig, entspannt und resortorientiert',
    idealForEn: ['Beach time', 'Family routes', 'Coastal add-ons'],
    idealForDe: ['Strandzeit', 'Familienrouten', 'Kuesten-Add-ons'],
  },
  tangier: {
    regionEn: 'Northern gateway',
    regionDe: 'Noerdliches Tor',
    moodEn: 'Mediterranean, literary, and cross-cultural',
    moodDe: 'Mediterran, literarisch und kulturuebergreifend',
    idealForEn: ['North Morocco', 'Medina walks', 'Sea views'],
    idealForDe: ['Nordmarokko', 'Medina-Spaziergaenge', 'Meeresblicke'],
  },
} as const;

export const itineraryDetails = {
  'atlantic-art-de-vivre': {
    paceEn: 'Relaxed pace',
    paceDe: 'Entspanntes Tempo',
    idealForEn: 'Travelers who want sea air, design hotels, and polished dining.',
    idealForDe: 'Reisende, die Meeresluft, Designhotels und gepflegtes Dining suchen.',
    highlightsEn: [
      'Essaouira medina and harbor mood',
      'Atlantic dining addresses',
      'A soft coastal contrast between Essaouira and Agadir',
    ],
    highlightsDe: [
      'Medina- und Hafenstimmung in Essaouira',
      'Dining-Adressen am Atlantik',
      'Ein sanfter Kuestenkontrast zwischen Essaouira und Agadir',
    ],
    sampleFlowEn: [
      'Day 1: Arrive and settle into a coastal boutique stay',
      'Day 2: Explore Essaouira with dining and artisan stops',
      'Day 3: Continue south with beach time and a slower rhythm',
    ],
    sampleFlowDe: [
      'Tag 1: Ankommen und in einem Boutique-Stay an der Kueste einchecken',
      'Tag 2: Essaouira mit Dining- und Handwerksstopps entdecken',
      'Tag 3: Weiter Richtung Sueden mit Strandzeit und langsamerem Rhythmus',
    ],
    flowSteps: [
      {
        id: 'atlantic-day-1',
        titleEn: 'Day 1 | Settle into Essaouira',
        titleDe: 'Tag 1 | In Essaouira ankommen',
        textEn:
          'Begin with a gentle arrival, medina textures, and a boutique stay shaped by Atlantic air.',
        textDe:
          'Beginnen Sie mit einer sanften Ankunft, Medina-Stimmung und einem Boutique-Stay mit Atlantikflair.',
        imageType: 'destination',
        imageId: 'essaouira',
      },
      {
        id: 'atlantic-day-2',
        titleEn: 'Day 2 | Dining and local rhythm',
        titleDe: 'Tag 2 | Dining und lokaler Rhythmus',
        textEn:
          'Use Essaouira as the social center of the route with artisan stops, seafood, and slower pacing.',
        textDe:
          'Nutzen Sie Essaouira als sozialen Mittelpunkt der Route mit Handwerksstopps, Seafood und langsamerem Tempo.',
        imageType: 'activity',
        imageId: 'winery-val',
      },
      {
        id: 'atlantic-day-3',
        titleEn: 'Day 3 | Continue south to Agadir',
        titleDe: 'Tag 3 | Weiter nach Agadir',
        textEn:
          'Extend the route toward Agadir for beach time, resort comfort, and a warmer coastal contrast.',
        textDe:
          'Verlaengern Sie die Route Richtung Agadir fuer Strandzeit, Resort-Komfort und einen waermeren Kuestenkontrast.',
        imageType: 'destination',
        imageId: 'agadir',
      },
    ] satisfies ItineraryFlowStep[],
  },
  'imperial-morocco': {
    paceEn: 'Balanced cultural pace',
    paceDe: 'Ausgewogenes Kulturtempo',
    idealForEn: 'Travelers focused on heritage, imperial cities, and classic Morocco highlights.',
    idealForDe: 'Reisende mit Fokus auf Heritage, Koenigsstaedte und klassische Marokko-Highlights.',
    highlightsEn: [
      'Marrakesh energy and design layers',
      'Fez medina immersion',
      'Rabat and Casablanca for elegant city contrast',
    ],
    highlightsDe: [
      'Energie und Designschichten in Marrakesch',
      'Immersion in die Medina von Fes',
      'Rabat und Casablanca fuer einen eleganten Stadtkontrast',
    ],
    sampleFlowEn: [
      'Day 1-2: Marrakesh for gardens, museums, and riads',
      'Day 3-4: Fez for heritage, craft, and medina depth',
      'Day 5-7: Rabat and Casablanca for a refined urban finish',
    ],
    sampleFlowDe: [
      'Tag 1-2: Marrakesch fuer Gaerten, Museen und Riads',
      'Tag 3-4: Fes fuer Heritage, Handwerk und Medina-Tiefe',
      'Tag 5-7: Rabat und Casablanca fuer einen eleganten urbanen Abschluss',
    ],
    flowSteps: [
      {
        id: 'imperial-day-1',
        titleEn: 'Days 1-2 | Marrakesh layers',
        titleDe: 'Tag 1-2 | Marrakesch in Schichten',
        textEn:
          'Open with gardens, museums, riads, and the high-energy urban texture of Marrakesh.',
        textDe:
          'Starten Sie mit Gaerten, Museen, Riads und der energiegeladenen urbanen Textur Marrakeschs.',
        imageType: 'destination',
        imageId: 'marrakesh',
      },
      {
        id: 'imperial-day-3',
        titleEn: 'Days 3-4 | Fez immersion',
        titleDe: 'Tag 3-4 | Fes als Immersion',
        textEn:
          'Shift into craft, heritage, and medina depth with a denser cultural rhythm in Fez.',
        textDe:
          'Wechseln Sie zu Handwerk, Heritage und Medina-Tiefe mit einem dichteren kulturellen Rhythmus in Fes.',
        imageType: 'destination',
        imageId: 'fez',
      },
      {
        id: 'imperial-day-5',
        titleEn: 'Days 5-7 | Rabat and Casablanca finish',
        titleDe: 'Tag 5-7 | Abschluss in Rabat und Casablanca',
        textEn:
          'Finish with a calmer capital mood in Rabat and a modern metropolitan contrast in Casablanca.',
        textDe:
          'Schliessen Sie mit einer ruhigeren Hauptstadtstimmung in Rabat und einem modernen Metropolenkontrast in Casablanca ab.',
        imageType: 'destination',
        imageId: 'rabat',
      },
    ] satisfies ItineraryFlowStep[],
  },
  'desert-and-design': {
    paceEn: 'Adventure with comfort',
    paceDe: 'Abenteuer mit Komfort',
    idealForEn: 'Travelers who want city style first, then southern landscapes and desert atmosphere.',
    idealForDe: 'Reisende, die zuerst Stadtstil und danach suedliche Landschaften und Wuestenatmosphaere suchen.',
    highlightsEn: [
      'Marrakesh design energy',
      'Southern kasbah landscapes',
      'Camp and desert-style experiences',
    ],
    highlightsDe: [
      'Designenergie in Marrakesch',
      'Suedliche Kasbah-Landschaften',
      'Camp- und Wuestenerlebnisse',
    ],
    sampleFlowEn: [
      'Day 1-2: Marrakesh for style, museums, and dining',
      'Day 3-4: Scenic transfer toward Ouarzazate and kasbah visits',
      'Day 5+: Desert-facing stay with camel or camp experiences',
    ],
    sampleFlowDe: [
      'Tag 1-2: Marrakesch fuer Stil, Museen und Dining',
      'Tag 3-4: Szoenischer Transfer Richtung Ouarzazate mit Kasbah-Besuchen',
      'Tag 5+: Wuestennaher Aufenthalt mit Kamel- oder Camp-Erlebnissen',
    ],
    flowSteps: [
      {
        id: 'desert-day-1',
        titleEn: 'Days 1-2 | Marrakesh design energy',
        titleDe: 'Tag 1-2 | Designenergie in Marrakesch',
        textEn:
          'Start in Marrakesh with strong visual culture, dining, and city polish before going south.',
        textDe:
          'Starten Sie in Marrakesch mit visueller Kultur, Dining und urbaner Eleganz, bevor es nach Sueden geht.',
        imageType: 'destination',
        imageId: 'marrakesh',
      },
      {
        id: 'desert-day-3',
        titleEn: 'Days 3-4 | Scenic move to Ouarzazate',
        titleDe: 'Tag 3-4 | Szoenischer Weg nach Ouarzazate',
        textEn:
          'The middle of the route is about open landscapes, kasbah textures, and cinematic southern space.',
        textDe:
          'Die Mitte der Route lebt von offenen Landschaften, Kasbah-Texturen und filmischer suedlicher Weite.',
        imageType: 'destination',
        imageId: 'ouarzazate',
      },
      {
        id: 'desert-day-5',
        titleEn: 'Day 5+ | Desert camp mood',
        titleDe: 'Tag 5+ | Wuestencamp-Stimmung',
        textEn:
          'Finish with desert-facing experiences, camp atmospheres, and camel or sunset moments.',
        textDe:
          'Beenden Sie die Reise mit Wuestenerlebnissen, Camp-Atmosphaere und Kamel- oder Sonnenuntergangsmomenten.',
        imageType: 'activity',
        imageId: 'camel-trekking',
      },
    ] satisfies ItineraryFlowStep[],
  },
} as const;

export const chauffeurDetails = {
  youssef: {
    experienceEn: '12+ years in premium transport and city-to-mountain transfers.',
    experienceDe: '12+ Jahre im Premium-Transport und bei Stadt-zu-Berg-Transfers.',
    coverageEn: ['Marrakesh', 'Agafay', 'Atlas Mountains', 'Ouarzazate'],
    coverageDe: ['Marrakesch', 'Agafay', 'Atlasgebirge', 'Ouarzazate'],
    idealForEn: 'Ideal for first-time visitors who want a composed and highly reliable driver.',
    idealForDe: 'Ideal fuer Erstbesucher, die einen ruhigen und sehr verlaesslichen Fahrer suchen.',
    drivingStyleEn: 'Discreet, smooth, and logistics-focused.',
    drivingStyleDe: 'Diskret, ruhig und logistikorientiert.',
    coveragePointIds: ['marrakesh', 'agafay', 'atlas-mountains', 'ouarzazate'],
  },
  samira: {
    experienceEn: 'Strong fit for coastal journeys, Essaouira arrivals, and dining-led day plans.',
    experienceDe: 'Sehr passend fuer Kuestenreisen, Essaouira-Ankuenfte und diningorientierte Tagesplaene.',
    coverageEn: ['Essaouira', 'Agadir', 'Atlantic coast'],
    coverageDe: ['Essaouira', 'Agadir', 'Atlantikkueste'],
    idealForEn: 'Ideal for couples or slow-travel guests who want a polished seaside rhythm.',
    idealForDe: 'Ideal fuer Paare oder Slow-Travel-Gaeste mit einem stilvollen Kuestenrhythmus.',
    drivingStyleEn: 'Warm, elegant, and locally insightful.',
    drivingStyleDe: 'Herzlich, elegant und lokal kenntnisreich.',
    coveragePointIds: ['essaouira', 'agadir', 'atlantic-coast'],
  },
  hamid: {
    experienceEn: 'Well suited to imperial-city routes, heritage stops, and full cultural circuits.',
    experienceDe: 'Sehr geeignet fuer Koenigsstadt-Routen, Heritage-Stopps und kulturelle Rundreisen.',
    coverageEn: ['Fez', 'Rabat', 'Casablanca', 'Chefchaouen'],
    coverageDe: ['Fes', 'Rabat', 'Casablanca', 'Chefchaouen'],
    idealForEn: 'Ideal for culture-led journeys with several city transitions.',
    idealForDe: 'Ideal fuer kulturorientierte Reisen mit mehreren Stadtwechseln.',
    drivingStyleEn: 'Structured, calm, and heritage-aware.',
    drivingStyleDe: 'Strukturiert, ruhig und heritage-orientiert.',
    coveragePointIds: ['fez', 'rabat', 'casablanca', 'chefchaouen'],
  },
} as const;

export default {
  destinationMapPoints,
  destinationInsights,
  itineraryDetails,
  chauffeurDetails,
};
