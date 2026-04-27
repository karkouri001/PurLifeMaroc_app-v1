import { DriverProfile, SignatureItinerary } from '../types';

export const privateChauffeurs: DriverProfile[] = [
  {
    id: 'youssef',
    name: 'Youssef El Mansouri',
    languages: ['English', 'French', 'German'],
    baseCity: 'Marrakesh',
    specialtiesEn: ['Atlas routes', 'Private airport transfers', 'Full-day city guidance'],
    specialtiesDe: ['Atlas-Routen', 'Private Flughafentransfers', 'Ganztagige Stadtbegleitung'],
    summaryEn:
      'Calm, polished, and ideal for travelers who want smooth transfers plus discreet local guidance.',
    summaryDe:
      'Ruhig, professionell und ideal fuer Reisende, die reibungslose Transfers und diskrete lokale Tipps suchen.',
    vehicleEn: 'Mercedes V-Class',
    vehicleDe: 'Mercedes V-Klasse',
    rating: 4.9,
  },
  {
    id: 'samira',
    name: 'Samira Boulahcen',
    languages: ['English', 'French', 'Spanish'],
    baseCity: 'Essaouira',
    specialtiesEn: ['Coastal day trips', 'Dining suggestions', 'Slow travel itineraries'],
    specialtiesDe: ['Kuestenausfluege', 'Dining-Empfehlungen', 'Slow-Travel-Routen'],
    summaryEn:
      'Excellent for relaxed Atlantic stays, dining addresses, and elegant seaside logistics.',
    summaryDe:
      'Ideal fuer entspannte Atlantik-Aufenthalte, gute Restaurantadressen und elegante Kuestenlogistik.',
    vehicleEn: 'Range Rover Sport',
    vehicleDe: 'Range Rover Sport',
    rating: 4.8,
  },
  {
    id: 'hamid',
    name: 'Hamid Benkirane',
    languages: ['English', 'French', 'Italian'],
    baseCity: 'Fez',
    specialtiesEn: ['Imperial cities', 'Cultural routes', 'Riads and heritage districts'],
    specialtiesDe: ['Koenigsstaedte', 'Kulturelle Routen', 'Riads und historische Viertel'],
    summaryEn:
      'Strong choice for culture-led trips across Fez, Rabat, Casablanca, and tailored city circuits.',
    summaryDe:
      'Eine starke Wahl fuer kulturorientierte Reisen durch Fez, Rabat, Casablanca und kuratierte Staedtetouren.',
    vehicleEn: 'Mercedes E-Class',
    vehicleDe: 'Mercedes E-Klasse',
    rating: 4.9,
  },
];

export const signatureItineraries: SignatureItinerary[] = [
  {
    id: 'atlantic-art-de-vivre',
    nameEn: 'Atlantic Art de Vivre',
    nameDe: 'Atlantischer Art de Vivre',
    summaryEn:
      'A refined seaside route combining Essaouira dining, Atlantic air, design-led stays, and gentle culture.',
    summaryDe:
      'Eine elegante Kuestenroute mit Essaouira-Dining, Atlantikflair, stilvollen Unterkuenften und entspannter Kultur.',
    duration: '4-5 days',
    destinations: ['essaouira', 'agadir'],
    themeEn: 'Coastal elegance',
    themeDe: 'Kuesten-Eleganz',
  },
  {
    id: 'imperial-morocco',
    nameEn: 'Imperial Morocco Highlights',
    nameDe: 'Highlights des imperialen Marokkos',
    summaryEn:
      'A culture-first journey through Marrakesh, Fez, Rabat, and Casablanca with museums, riads, and private guidance.',
    summaryDe:
      'Eine kulturorientierte Reise durch Marrakesh, Fez, Rabat und Casablanca mit Museen, Riads und privater Begleitung.',
    duration: '7-9 days',
    destinations: ['marrakesh', 'fez', 'rabat', 'casablanca'],
    themeEn: 'Culture and heritage',
    themeDe: 'Kultur und Erbe',
  },
  {
    id: 'desert-and-design',
    nameEn: 'Desert and Design Escape',
    nameDe: 'Wueste und Design Escape',
    summaryEn:
      'A warm contrast of urban aesthetics and southern landscapes, from Marrakesh to Ouarzazate and desert camps.',
    summaryDe:
      'Ein warmer Kontrast aus urbaner Aesthetik und suedlichen Landschaften, von Marrakesh bis Ouarzazate und Wuestencamps.',
    duration: '5-7 days',
    destinations: ['marrakesh', 'ouarzazate'],
    themeEn: 'Design and adventure',
    themeDe: 'Design und Abenteuer',
  },
];
