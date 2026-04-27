import { Enquiry, Destination, Activity, Accommodation } from '../types';
import * as Linking from 'expo-linking';
import { companyInfo } from '../data/companyInfo';

/**
 * Email utility functions
 */
export const emailUtils = {
  /**
   * Generate email body for enquiry
   */
  generateEnquiryEmailBody: (
    enquiry: Enquiry,
    destinations: Destination[],
    activities: Activity[],
    accommodation: Accommodation[]
  ): string => {
    const destinationNames = enquiry.destinations
      .map((id) => destinations.find((d) => d.id === id)?.nameEn || id)
      .join(', ');

    const activityNames = activities
      .filter((a) => enquiry.destinations.includes(a.destination))
      .slice(0, 3)
      .map((a) => a.nameEn)
      .join(', ');

    const accommodationName = accommodation.find(
      (a) => enquiry.destinations.includes(a.destination)
    )?.nameEn;

    const body = `
CONCIERGE GUIDANCE REQUEST FROM PUR LIFE MAROC APP
=================================================

PERSONAL DETAILS
Name: ${enquiry.name}
Email: ${enquiry.email}
Phone: ${enquiry.phone}

TRAVEL CONTEXT
Travel Style: ${enquiry.travelStyle || 'Not specified'}
Destinations: ${destinationNames || 'Not specified'}
Trip Timing: ${enquiry.startDate || 'Flexible'}
Duration: ${enquiry.duration || 'Flexible'}
Budget: ${enquiry.budget || 'Flexible'}
Suggested Activities: ${activityNames || 'To be curated by concierge'}
Suggested Accommodation: ${accommodationName || 'To be curated by concierge'}

MESSAGE FOR THE CONCIERGE
${enquiry.specialRequests || 'The traveler would like guidance and recommendations.'}

---
This guidance request was created via the Pur Life Maroc mobile app on ${new Date().toLocaleDateString()}.
Reference: ${enquiry.id}
`;

    return body;
  },

  /**
   * Send enquiry via email client
   */
  sendEnquiryEmail: async (
    enquiry: Enquiry,
    destinations: Destination[],
    activities: Activity[],
    accommodation: Accommodation[]
    ): Promise<boolean> => {
    try {
      const subject = encodeURIComponent('Concierge guidance request from Pur Life Maroc App');
      const body = encodeURIComponent(
        emailUtils.generateEnquiryEmailBody(
          enquiry,
          destinations,
          activities,
          accommodation
        )
      );

      const destinationEmail = companyInfo.contactOffice.email;
      const mailtoUrl = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;

      const canOpen = await Linking.canOpenURL(mailtoUrl);
      if (canOpen) {
        await Linking.openURL(mailtoUrl);
        return true;
      }

      // Fallback: open regular email with just subject
      const fallbackUrl = `mailto:${destinationEmail}?subject=${subject}`;
      await Linking.openURL(fallbackUrl);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  },
};

/**
 * Format utilities
 */
export const formatUtils = {
  /**
   * Format date to readable string
   */
  formatDate: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  /**
   * Format price range
   */
  formatPrice: (priceString: string): string => {
    return priceString.startsWith('$') ? priceString : `$${priceString}`;
  },

  /**
   * Truncate text to specified length
   */
  truncateText: (text: string, length: number = 100): string => {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + '...';
  },
};

/**
 * Validation utilities
 */
export const validationUtils = {
  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone format (basic)
   */
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
  },

  /**
   * Validate enquiry form
   */
  validateEnquiry: (enquiry: Partial<Enquiry>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!enquiry.name || enquiry.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }

    if (!enquiry.email || !validationUtils.isValidEmail(enquiry.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!enquiry.phone || !validationUtils.isValidPhone(enquiry.phone)) {
      errors.push('Please enter a valid phone number');
    }

    if (!enquiry.travelStyle) {
      errors.push('Please select a travel style');
    }

    if (!enquiry.destinations || enquiry.destinations.length === 0) {
      errors.push('Please select at least one destination');
    }

    if (!enquiry.startDate) {
      errors.push('Please select a start date');
    }

    if (!enquiry.duration) {
      errors.push('Please select duration');
    }

    if (!enquiry.budget) {
      errors.push('Please select budget range');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },
};

/**
 * Analytics/Insights utilities
 */
export const insightsUtils = {
  /**
   * Generate mock insights data
   */
  generateMockInsights: () => {
    return {
      topTravelStyle: {
        name: 'Bespoke Travel / The Curator',
        count: 342,
      },
      topDestination: {
        name: 'Marrakesh',
        count: 287,
      },
      topActivity: {
        name: 'Atlas Mountains Trek',
        count: 156,
      },
      topAccommodation: {
        name: 'Luxury Palaces',
        count: 203,
      },
      topItinerary: {
        name: 'Imperial Morocco Highlights',
        count: 119,
      },
      topDriver: {
        name: 'Youssef El Mansouri',
        count: 94,
      },
      trendingExperiences: [
        { name: 'Private chauffeur day routes', trend: 45 },
        { name: 'Hammam and wellness rituals', trend: 38 },
        { name: 'Atlantic dining escapes', trend: 32 },
        { name: 'Imperial city circuits', trend: 28 },
        { name: 'Design-led desert stays', trend: 21 },
      ],
    };
  },
};

/**
 * Storage utilities
 */
export const storageUtils = {
  /**
   * Generate unique ID (for references, etc.)
   */
  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  /**
   * Format enquiry as summary
   */
  formatEnquirySummary: (enquiry: Enquiry): string => {
    return `
Trip to ${enquiry.destinations.length} destination(s)
Duration: ${enquiry.duration}
Budget: ${enquiry.budget}
Submitted: ${new Date(enquiry.createdAt).toLocaleDateString()}
    `.trim();
  },
};
