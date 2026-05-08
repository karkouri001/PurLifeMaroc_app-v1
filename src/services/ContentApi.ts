import {
  accommodations,
  activities,
  destinations,
  restaurants,
  travelStyles,
} from '../data/mockData';
import { privateChauffeurs, signatureItineraries } from '../data/conciergeData';
import { companyInfo } from '../data/companyInfo';
import type {
  Accommodation,
  Activity,
  Destination,
  DriverProfile,
  Restaurant,
  SignatureItinerary,
  TravelStyle,
} from '../types';

export type WebsiteContentPayload = {
  travelStyles: TravelStyle[];
  destinations: Destination[];
  activities: Activity[];
  accommodations: Accommodation[];
  restaurants: Restaurant[];
  drivers: DriverProfile[];
  itineraries: SignatureItinerary[];
  companyProfile: {
    brandName: string;
    aboutEn: string;
    aboutDe: string;
    email: string;
    phone: string;
  };
  source: string;
};

const DEFAULT_API_BASE_URL = 'http://localhost:3001/api';

export const getContentApiBaseUrl = () => {
  return process.env.EXPO_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL;
};

export const getMockWebsiteContent = (): WebsiteContentPayload => ({
  travelStyles,
  destinations,
  activities,
  accommodations,
  restaurants,
  drivers: privateChauffeurs,
  itineraries: signatureItineraries,
  companyProfile: {
    brandName: companyInfo.name,
    aboutEn: companyInfo.aboutEn,
    aboutDe: companyInfo.aboutDe,
    email: companyInfo.contactOffice.email,
    phone: companyInfo.moroccoOffice.phone,
  },
  source: 'mock',
});

export async function fetchWebsiteContent(): Promise<WebsiteContentPayload> {
  try {
    const response = await fetch(`${getContentApiBaseUrl()}/content/website`);

    if (!response.ok) {
      throw new Error(`Content API returned ${response.status}`);
    }

    return (await response.json()) as WebsiteContentPayload;
  } catch {
    return getMockWebsiteContent();
  }
}

export default {
  fetchWebsiteContent,
  getContentApiBaseUrl,
  getMockWebsiteContent,
};
