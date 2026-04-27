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
  priceRange: string;
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
  pricePerNight: string;
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
  priceRange: string;
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
  budget: 'budget' | 'mid' | 'luxury' | null;
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

export interface TripPlanItem {
  id: string;
  type: ContentType;
  itemId: string;
  day: number;
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
  budget: string;
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

export interface BudgetEstimateLine {
  id: string;
  label: string;
  minimum: number;
  maximum: number;
  note?: string;
}

export interface BudgetEstimate {
  nights: number;
  travelers: number;
  lines: BudgetEstimateLine[];
  totalMinimum: number;
  totalMaximum: number;
}
