import {
  UserPreferences,
  RecommendationResult,
  Destination,
  Activity,
  Accommodation,
} from '../types';

/**
 * Simple rule-based recommendation engine
 * No AI/ML - just logic-based recommendations
 */
export class RecommendationEngine {
  private static readonly travelStyleDestinationMap: Record<string, string[]> = {
    curator: ['marrakesh', 'essaouira', 'fez', 'ouarzazate'],
    culturist: ['fez', 'marrakesh', 'chefchaouen', 'casablanca'],
    urbanite: ['casablanca', 'marrakesh', 'rabat', 'tangier'],
    nomad: ['ouarzazate', 'chefchaouen', 'agadir', 'essaouira'],
  };

  private static readonly styleActivityCategories: Record<string, string[]> = {
    curator: ['Cultural', 'Gastronomic', 'Wellness'],
    culturist: ['Cultural', 'Adventure'],
    urbanite: ['Cultural', 'Gastronomic'],
    nomad: ['Adventure', 'Beach & Water', 'Sport'],
  };

  private static readonly interestDestinationMap: Record<string, string[]> = {
    culture: ['fez', 'marrakesh', 'rabat', 'tangier'],
    adventure: ['ouarzazate', 'agadir', 'chefchaouen', 'marrakesh'],
    gastronomy: ['essaouira', 'marrakesh', 'fez', 'casablanca'],
    beach: ['essaouira', 'agadir', 'tangier', 'casablanca'],
    shopping: ['marrakesh', 'casablanca', 'fez', 'tangier'],
    history: ['fez', 'rabat', 'marrakesh', 'ouarzazate'],
  };

  private static readonly interestActivityCategories: Record<string, string[]> = {
    culture: ['Cultural', 'Nature'],
    adventure: ['Adventure', 'Beach & Water', 'Sport'],
    gastronomy: ['Gastronomic'],
    beach: ['Beach & Water'],
    shopping: ['Cultural', 'Gastronomic'],
    history: ['Cultural'],
  };

  static generateRecommendations(
    preferences: UserPreferences,
    allDestinations: Destination[],
    allActivities: Activity[],
    allAccommodations: Accommodation[]
  ): RecommendationResult {
    // Filter destinations
    let recommendedDestinations = this.filterDestinations(
      allDestinations,
      preferences
    );
    const shortlistedDestinations = recommendedDestinations.slice(0, 3);

    // Filter activities
    let recommendedActivities = this.filterActivities(
      allActivities,
      preferences,
      shortlistedDestinations
    );

    // Filter accommodation
    let recommendedAccommodation = this.filterAccommodation(
      allAccommodations,
      preferences,
      shortlistedDestinations
    );

    // Generate explanation
    const explanation = this.generateExplanation(preferences);

    return {
      destinations: shortlistedDestinations,
      activities: recommendedActivities.slice(0, 4),
      accommodation: recommendedAccommodation.slice(0, 2),
      explanation,
    };
  }

  private static filterDestinations(
    allDestinations: Destination[],
    preferences: UserPreferences
  ): Destination[] {
    return [...allDestinations]
      .map((destination, index) => ({
        destination,
        index,
        score: this.getDestinationScore(destination, preferences),
      }))
      .sort((first, second) => {
        if (second.score !== first.score) {
          return second.score - first.score;
        }

        return first.index - second.index;
      })
      .map(({ destination }) => destination);
  }

  private static getDestinationScore(
    destination: Destination,
    preferences: UserPreferences
  ): number {
    let score = 0;

    if (preferences.preferredDestinations.includes(destination.id)) {
      score += 80;
    }

    const styleMatches =
      this.travelStyleDestinationMap[preferences.travelStyle || 'curator'] || [];
    if (styleMatches.includes(destination.id)) {
      score += 28;
    }

    preferences.interests.forEach((interest) => {
      if (this.interestDestinationMap[interest]?.includes(destination.id)) {
        score += 14;
      }
    });

    if (preferences.duration === 'weekend') {
      const shortTripFits = ['essaouira', 'marrakesh', 'casablanca', 'rabat'];
      if (shortTripFits.includes(destination.id)) {
        score += 16;
      }
    }

    if (preferences.duration === 'month') {
      const longTripFits = ['fez', 'ouarzazate', 'tangier', 'chefchaouen'];
      if (longTripFits.includes(destination.id)) {
        score += 10;
      }
    }

    return score;
  }

  private static filterActivities(
    allActivities: Activity[],
    preferences: UserPreferences,
    destinations: Destination[]
  ): Activity[] {
    const destinationIds = destinations.map((d) => d.id);
    const preferredCategories =
      this.styleActivityCategories[preferences.travelStyle || 'curator'] || [];

    return allActivities
      .filter((activity) => destinationIds.includes(activity.destination))
      .map((activity, index) => {
        let score = 0;

        if (preferredCategories.includes(activity.category)) {
          score += 22;
        }

        preferences.interests.forEach((interest) => {
          if (this.interestActivityCategories[interest]?.includes(activity.category)) {
            score += 15;
          }
        });

        if (preferences.duration === 'weekend' && this.isShortActivity(activity.duration)) {
          score += 8;
        }

        if (preferences.duration === 'month' && this.isExtendedActivity(activity.duration)) {
          score += 6;
        }

        return { activity, index, score };
      })
      .sort((first, second) => {
        if (second.score !== first.score) {
          return second.score - first.score;
        }

        return first.index - second.index;
      })
      .map(({ activity }) => activity);
  }

  private static filterAccommodation(
    allAccommodations: Accommodation[],
    preferences: UserPreferences,
    destinations: Destination[]
  ): Accommodation[] {
    const destinationIds = destinations.map((d) => d.id);
    const destinationMatches = allAccommodations.filter((accommodation) =>
      destinationIds.includes(accommodation.destination)
    );

    return destinationMatches
      .map((accommodation, index) => {
        let score = 0;

        if (preferences.accommodationPreference === accommodation.category) {
          score += 30;
        }

        if (preferences.duration === 'weekend' && accommodation.category !== 'camp') {
          score += 6;
        }

        return { accommodation, index, score };
      })
      .sort((first, second) => {
        if (second.score !== first.score) {
          return second.score - first.score;
        }

        return first.index - second.index;
      })
      .map(({ accommodation }) => accommodation);
  }

  private static isShortActivity(duration: string): boolean {
    return /hours|1\.5|2|3|4/.test(duration.toLowerCase()) && !/day/.test(duration.toLowerCase());
  }

  private static isExtendedActivity(duration: string): boolean {
    return /day|multi/.test(duration.toLowerCase());
  }

  private static generateExplanation(preferences: UserPreferences): string {
    const styleName = preferences.travelStyle || 'custom';
    const durationText = preferences.duration || 'flexible';

    const explanations: { [key: string]: string } = {
      curator:
        'These selections lean into a bespoke travel profile with polished stays and flexible, curated moments.',
      culturist:
        'This set emphasizes Morocco\'s cultural depth, heritage stops, and places with strong local character.',
      urbanite:
        'This recommendation set focuses on energetic cities, design-led stops, and contemporary Moroccan life.',
      nomad:
        'This profile pushes the trip toward movement, open landscapes, and more adventurous experiences.',
    };

    const baseExplanation =
      explanations[styleName] ||
      'These selections are tailored to create a more useful Moroccan travel shortlist.';

    const interestNames = preferences.interests
      .map((interest) => {
        const labels: Record<string, string> = {
          culture: 'culture',
          adventure: 'adventure',
          gastronomy: 'gastronomy',
          beach: 'beach time',
          shopping: 'shopping',
          history: 'history',
        };

        return labels[interest] || interest;
      })
      .slice(0, 3);

    const interestText =
      interestNames.length > 0
        ? ` It also leans toward ${interestNames.join(', ')}.`
        : '';

    const destinationText =
      preferences.preferredDestinations.length > 0
        ? ' Your preferred destinations were prioritized first.'
        : '';

    const stayText = preferences.accommodationPreference
      ? ` Stay matching also respects your ${preferences.accommodationPreference} preference.`
      : '';

    return `${baseExplanation} It reflects your ${durationText} trip length without exposing commercial ranges to the guest.${interestText}${destinationText}${stayText}`;
  }
}

export default RecommendationEngine;
