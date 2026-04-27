import { Injectable } from '@nestjs/common';
import {
  AccommodationDto,
  ActivityDto,
  CompanyProfileDto,
  DestinationDto,
  DriverProfileDto,
  RestaurantDto,
  SignatureItineraryDto,
  TravelStyleDto,
} from '../dto/content.dto';
import { ContentProvider } from './content-provider.interface';

const travelStyles: TravelStyleDto[] = [
  {
    id: 'curator',
    nameEn: 'The Curator',
    nameDe: 'The Curator',
    descriptionEn: 'A refined profile focused on polished and curated experiences.',
    descriptionDe: 'Ein raffiniertes Profil mit fokus auf kuratierte und elegante erlebnisse.',
    icon: 'sparkles',
    color: '#B85C38',
  },
  {
    id: 'nomad',
    nameEn: 'The Nomad',
    nameDe: 'The Nomad',
    descriptionEn: 'A moving travel style centered on landscapes and adventure.',
    descriptionDe: 'Ein bewegtes reisestilprofil mit fokus auf landschaften und abenteuer.',
    icon: 'map',
    color: '#6C6E4E',
  },
];

const destinations: DestinationDto[] = [
  {
    id: 'marrakesh',
    nameEn: 'Marrakesh',
    nameDe: 'Marrakesch',
    descriptionEn: 'A vibrant city mixing design, heritage, dining, and boutique hospitality.',
    descriptionDe: 'Eine lebendige stadt zwischen design, kulturerbe, gastronomie und boutique-hotellerie.',
    image: 'marrakesh.png',
    highlights: ['Medina', 'Design hotels', 'Gardens'],
    bestSeason: 'Spring and autumn',
  },
  {
    id: 'essaouira',
    nameEn: 'Essaouira',
    nameDe: 'Essaouira',
    descriptionEn: 'An Atlantic destination known for slower rhythm, dining, and coastal light.',
    descriptionDe: 'Ein atlantisches ziel mit ruhigem rhythmus, gastronomie und kuestenlicht.',
    image: 'essaouira.png',
    highlights: ['Oceanfront', 'Seafood', 'Medina walls'],
    bestSeason: 'All year',
  },
  {
    id: 'fez',
    nameEn: 'Fez',
    nameDe: 'Fes',
    descriptionEn: 'A heritage-rich city suited to cultural discovery and craft traditions.',
    descriptionDe: 'Eine kulturreiche stadt, geeignet fuer entdeckung, handwerk und geschichte.',
    image: 'fez.png',
    highlights: ['Medina', 'Crafts', 'History'],
    bestSeason: 'Spring',
  },
];

const activities: ActivityDto[] = [
  {
    id: 'jardin-majorelle',
    nameEn: 'Jardin Majorelle',
    nameDe: 'Jardin Majorelle',
    descriptionEn: 'A cultural stop pairing gardens, design, and urban exploration.',
    descriptionDe: 'Ein kultureller stopp mit gaerten, design und urbaner erkundung.',
    destination: 'marrakesh',
    category: 'Cultural',
    image: 'jardin-majorelle.png',
    duration: '2 hours',
    priceRange: '$25-$40',
  },
  {
    id: 'boat-tour',
    nameEn: 'Harbor boat tour',
    nameDe: 'Hafen bootstour',
    descriptionEn: 'A short Atlantic experience ideal for a relaxed coastal itinerary.',
    descriptionDe: 'Ein kurzes atlantisches erlebnis fuer eine entspannte kuestenroute.',
    destination: 'essaouira',
    category: 'Beach & Water',
    image: 'boat-tour.png',
    duration: '2 hours',
    priceRange: '$20-$35',
  },
  {
    id: 'medina-walk-fez',
    nameEn: 'Fez medina walk',
    nameDe: 'Medina rundgang in Fes',
    descriptionEn: 'A guided cultural route through craft lanes and heritage sites.',
    descriptionDe: 'Ein gefuehrter kultureller rundgang durch handwerksgassen und kulturorte.',
    destination: 'fez',
    category: 'Cultural',
    image: 'medina-walk-fez.png',
    duration: 'Half day',
    priceRange: '$30-$50',
  },
];

const accommodations: AccommodationDto[] = [
  {
    id: 'palais-ronsard',
    nameEn: 'Palais Ronsard',
    nameDe: 'Palais Ronsard',
    descriptionEn: 'A luxury stay designed for refined city escape.',
    descriptionDe: 'Ein luxuriouser aufenthalt fuer eine elegante stadtflucht.',
    destination: 'marrakesh',
    category: 'luxury',
    image: 'palais-ronsard.png',
    amenities: ['Spa', 'Pool', 'Private garden'],
    pricePerNight: '$260-$380',
  },
  {
    id: 'villa-maroc',
    nameEn: 'Villa Maroc',
    nameDe: 'Villa Maroc',
    descriptionEn: 'A boutique stay with strong local atmosphere near the medina.',
    descriptionDe: 'Ein boutique-haus mit lokaler atmosphaere nahe der medina.',
    destination: 'essaouira',
    category: 'boutique',
    image: 'villa-maroc.png',
    amenities: ['Terrace', 'Breakfast', 'Local decor'],
    pricePerNight: '$120-$180',
  },
  {
    id: 'riad-fes',
    nameEn: 'Riad Fes',
    nameDe: 'Riad Fes',
    descriptionEn: 'A heritage-oriented luxury riad in Fez.',
    descriptionDe: 'Ein heritage-orientiertes luxus-riad in fes.',
    destination: 'fez',
    category: 'luxury',
    image: 'riad-fes.png',
    amenities: ['Spa', 'Rooftop', 'Fine dining'],
    pricePerNight: '$220-$320',
  },
];

const restaurants: RestaurantDto[] = [
  {
    id: 'kasbah-lamrani',
    nameEn: 'Kasbah Lamrani',
    nameDe: 'Kasbah Lamrani',
    descriptionEn: 'A curated dining address suited to a premium Marrakesh stay.',
    descriptionDe: 'Eine kuratierte dining-adresse passend zu einem premium-aufenthalt in marrakesch.',
    destination: 'marrakesh',
    cuisine: 'Moroccan contemporary',
    image: 'kasbah-lamrani.png',
    specialties: ['Tagine', 'Seasonal tasting', 'Tea service'],
    priceRange: '$35-$70',
  },
  {
    id: 'umia',
    nameEn: 'Umia',
    nameDe: 'Umia',
    descriptionEn: 'A lighter dining option with a coastal feel in Essaouira.',
    descriptionDe: 'Eine leichtere dining-option mit kuestencharakter in essaouira.',
    destination: 'essaouira',
    cuisine: 'Fusion',
    image: 'umia.png',
    specialties: ['Seafood', 'Salads', 'Creative plates'],
    priceRange: '$25-$50',
  },
];

const drivers: DriverProfileDto[] = [
  {
    id: 'youssef',
    name: 'Youssef El Mansouri',
    languages: ['Arabic', 'French', 'English'],
    baseCity: 'Marrakesh',
    specialtiesEn: ['Private day routes', 'Airport pickup', 'City transfers'],
    specialtiesDe: ['Private tagesrouten', 'Flughafen transfer', 'Stadtfahrten'],
    summaryEn: 'A private chauffeur profile focused on premium routing and flexible planning.',
    summaryDe: 'Ein privates chauffeur-profil mit fokus auf premium-routen und flexible planung.',
    vehicleEn: 'Mercedes V-Class',
    vehicleDe: 'Mercedes V-Klasse',
    rating: 4.9,
  },
];

const itineraries: SignatureItineraryDto[] = [
  {
    id: 'imperial-highlights',
    nameEn: 'Imperial Morocco Highlights',
    nameDe: 'Imperiale highlights marokkos',
    summaryEn: 'A cultural route connecting heritage-rich urban destinations.',
    summaryDe: 'Eine kulturelle route zwischen staedten mit starkem kulturerbe.',
    duration: '7 days',
    destinations: ['marrakesh', 'fez'],
    themeEn: 'Culture and heritage',
    themeDe: 'Kultur und kulturerbe',
  },
  {
    id: 'atlantic-rhythm',
    nameEn: 'Atlantic Rhythm',
    nameDe: 'Atlantischer rhythmus',
    summaryEn: 'A coastal route balancing slower pace, sea air, and dining.',
    summaryDe: 'Eine kuestenroute zwischen entspanntem rhythmus, meer und gastronomie.',
    duration: '5 days',
    destinations: ['essaouira', 'marrakesh'],
    themeEn: 'Coast and lifestyle',
    themeDe: 'Kueste und lebensstil',
  },
];

const companyProfile: CompanyProfileDto = {
  brandName: 'Pur Life Maroc',
  aboutEn: 'Pur Life Maroc is positioned as a private travel concierge focused on curated Moroccan journeys.',
  aboutDe: 'Pur Life Maroc ist als private travel-concierge-marke fuer kuratierte marokkanische reisen positioniert.',
  email: 'inside@purlife-maroc.com',
  phone: '+212 600 000000',
};

@Injectable()
export class MockContentProvider implements ContentProvider {
  async getTravelStyles() {
    return travelStyles;
  }

  async getDestinations() {
    return destinations;
  }

  async getActivities() {
    return activities;
  }

  async getAccommodations() {
    return accommodations;
  }

  async getRestaurants() {
    return restaurants;
  }

  async getDrivers() {
    return drivers;
  }

  async getItineraries() {
    return itineraries;
  }

  async getCompanyProfile() {
    return companyProfile;
  }
}
