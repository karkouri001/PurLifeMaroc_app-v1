// Travel Styles
export interface TravelStyle {
  id: string;
  nameEn: string;
  nameDe: string;
  descriptionEn: string;
  descriptionDe: string;
  icon: string;
  color: string;
}

// Destinations
export interface Destination {
  id: string;
  nameEn: string;
  nameDe: string;
  descriptionEn: string;
  descriptionDe: string;
  image: string;
  highlights: string[];
  bestSeason: string;
}

// Activities
export interface Activity {
  id: string;
  nameEn: string;
  nameDe: string;
  descriptionEn: string;
  descriptionDe: string;
  destination: string; // destination id
  category: string;
  image: string;
  duration: string;
  serviceNote: string;
}

// Accommodation
export interface Accommodation {
  id: string;
  nameEn: string;
  nameDe: string;
  descriptionEn: string;
  descriptionDe: string;
  destination: string; // destination id
  category: 'luxury' | 'boutique' | 'camp' | 'traditional';
  image: string;
  amenities: string[];
  stayStyle: string;
}

// Dining
export interface Restaurant {
  id: string;
  nameEn: string;
  nameDe: string;
  descriptionEn: string;
  descriptionDe: string;
  destination: string; // destination id
  cuisine: string;
  image: string;
  specialties: string[];
  atmosphere: string;
}

export interface DriverProfile {
  id: string;
  name: string;
  languages: string[];
  baseCity: string;
  specialtiesEn: string[];
  specialtiesDe: string[];
  summaryEn: string;
  summaryDe: string;
  vehicleEn: string;
  vehicleDe: string;
  rating: number;
}

export interface SignatureItinerary {
  id: string;
  nameEn: string;
  nameDe: string;
  summaryEn: string;
  summaryDe: string;
  duration: string;
  destinations: string[];
  themeEn: string;
  themeDe: string;
}

export type ContentType =
  | 'activity'
  | 'accommodation'
  | 'destination'
  | 'restaurant';

// User Preferences
export interface UserPreferences {
  travelStyle: string | null;
  duration: 'weekend' | 'week' | 'twoweeks' | 'month' | null;
  interests: string[];
  preferredDestinations: string[];
  accommodationPreference: 'luxury' | 'boutique' | 'camp' | 'traditional' | null;
}

// Recommendations
export interface RecommendationResult {
  destinations: Destination[];
  activities: Activity[];
  accommodation: Accommodation[];
  explanation: string;
}

// Favorites
export interface Favorite {
  id: string;
  type: ContentType;
  itemId: string;
  addedAt: number;
}

export interface UISettings {
  extendIntoStatusBar: boolean;
}

// Enquiry
export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  travelStyle: string;
  destinations: string[];
  startDate: string;
  duration: string;
  specialRequests: string;
  createdAt: number;
}

// Chat message
export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: number;
}

// Insights data
export interface InsightsData {
  topTravelStyle: { name: string; count: number };
  topDestination: { name: string; count: number };
  topActivity: { name: string; count: number };
  topAccommodation: { name: string; count: number };
  topItinerary: { name: string; count: number };
  topDriver: { name: string; count: number };
  trendingExperiences: { name: string; trend: number }[];
}

export type PreStayLanguage = 'en' | 'de';

export interface PreStayGuest {
  firstName: string;
  lastName: string;
  email: string;
}

export interface PreStayReservation {
  reference: string;
  title: string;
  status: string;
  startDate: string;
  endDate: string;
  durationLabel: string;
  destinations: string[];
  travelersLabel: string;
  managerName: string;
  managerEmail: string;
}

export interface PreStayDay {
  id: string;
  labelEn: string;
  labelDe: string;
  titleEn: string;
  titleDe: string;
  textEn: string;
  textDe: string;
}

export interface PreStayDocument {
  id: string;
  title: string;
  type: string;
  url?: string;
}

export interface PreStayServiceCard {
  id: string;
  titleEn: string;
  titleDe: string;
  textEn: string;
  textDe: string;
  actionEn: string;
  actionDe: string;
  route?: string;
}

export interface PreStayChecklistItem {
  id: string;
  titleEn: string;
  titleDe: string;
  textEn: string;
  textDe: string;
  done: boolean;
}

export interface PreStaySession {
  token: string;
  source: 'ezus' | 'mock';
  language: PreStayLanguage;
  guest: PreStayGuest;
  reservation: PreStayReservation;
  days: PreStayDay[];
  documents: PreStayDocument[];
  services: PreStayServiceCard[];
  checklist: PreStayChecklistItem[];
  generatedAt: string;
}
