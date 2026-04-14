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
  type: 'activity' | 'accommodation' | 'destination' | 'restaurant';
  itemId: string;
  addedAt: number;
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
  trendingExperiences: Array<{ name: string; trend: number }>;
}
