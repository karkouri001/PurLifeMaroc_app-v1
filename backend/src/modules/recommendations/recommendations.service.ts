import { Injectable } from '@nestjs/common';
import { ContentService } from '../content/content.service';
import { AccommodationDto, ActivityDto, DestinationDto } from '../content/dto/content.dto';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';

@Injectable()
export class RecommendationsService {
  private readonly travelStyleDestinationMap: Record<string, string[]> = {
    curator: ['marrakesh', 'essaouira', 'fez'],
    nomad: ['essaouira', 'marrakesh'],
    culturist: ['fez', 'marrakesh'],
    urbanite: ['marrakesh'],
  };

  private readonly styleActivityCategories: Record<string, string[]> = {
    curator: ['Cultural', 'Gastronomic', 'Wellness'],
    nomad: ['Adventure', 'Beach & Water', 'Sport'],
    culturist: ['Cultural'],
    urbanite: ['Cultural', 'Gastronomic'],
  };

  private readonly interestDestinationMap: Record<string, string[]> = {
    culture: ['fez', 'marrakesh'],
    adventure: ['essaouira', 'marrakesh'],
    gastronomy: ['essaouira', 'marrakesh', 'fez'],
    beach: ['essaouira'],
    history: ['fez', 'marrakesh'],
  };

  private readonly interestActivityCategories: Record<string, string[]> = {
    culture: ['Cultural'],
    adventure: ['Adventure', 'Beach & Water'],
    gastronomy: ['Gastronomic'],
    beach: ['Beach & Water'],
    history: ['Cultural'],
  };

  constructor(private readonly contentService: ContentService) {}

  async buildRecommendations(
    preferences: CreateRecommendationDto
  ): Promise<RecommendationResponseDto> {
    const [destinations, activities, accommodations] = await Promise.all([
      this.contentService.getDestinations(),
      this.contentService.getActivities(),
      this.contentService.getAccommodations(),
    ]);

    const recommendedDestinations = this.filterDestinations(destinations, preferences);
    const shortlistedDestinations = recommendedDestinations.slice(0, 3);
    const recommendedActivities = this.filterActivities(
      activities,
      preferences,
      shortlistedDestinations
    );
    const recommendedAccommodation = this.filterAccommodation(
      accommodations,
      preferences,
      shortlistedDestinations
    );

    return {
      destinations: shortlistedDestinations,
      activities: recommendedActivities.slice(0, 4),
      accommodation: recommendedAccommodation.slice(0, 2),
      explanation: this.generateExplanation(preferences),
    };
  }

  private filterDestinations(
    allDestinations: DestinationDto[],
    preferences: CreateRecommendationDto
  ): DestinationDto[] {
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

  private getDestinationScore(
    destination: DestinationDto,
    preferences: CreateRecommendationDto
  ): number {
    let score = 0;

    if (preferences.preferredDestinations?.includes(destination.id)) {
      score += 80;
    }

    const styleMatches =
      this.travelStyleDestinationMap[preferences.travelStyle || 'curator'] || [];
    if (styleMatches.includes(destination.id)) {
      score += 28;
    }

    (preferences.interests || []).forEach((interest) => {
      if (this.interestDestinationMap[interest]?.includes(destination.id)) {
        score += 14;
      }
    });

    if (preferences.duration === 'weekend' && ['essaouira', 'marrakesh'].includes(destination.id)) {
      score += 12;
    }

    return score;
  }

  private filterActivities(
    allActivities: ActivityDto[],
    preferences: CreateRecommendationDto,
    destinations: DestinationDto[]
  ): ActivityDto[] {
    const destinationIds = destinations.map((item) => item.id);
    const preferredCategories =
      this.styleActivityCategories[preferences.travelStyle || 'curator'] || [];

    return allActivities
      .filter((activity) => destinationIds.includes(activity.destination))
      .map((activity, index) => {
        let score = 0;

        if (preferredCategories.includes(activity.category)) {
          score += 22;
        }

        (preferences.interests || []).forEach((interest) => {
          if (this.interestActivityCategories[interest]?.includes(activity.category)) {
            score += 15;
          }
        });

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

  private filterAccommodation(
    allAccommodations: AccommodationDto[],
    preferences: CreateRecommendationDto,
    destinations: DestinationDto[]
  ): AccommodationDto[] {
    const destinationIds = destinations.map((item) => item.id);
    const pool = allAccommodations.filter((item) => destinationIds.includes(item.destination));

    return pool
      .map((accommodation, index) => {
        let score = 0;

        if (preferences.accommodationPreference === accommodation.category) {
          score += 30;
        }

        if (this.matchesBudget(accommodation.pricePerNight, preferences.budget)) {
          score += 22;
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

  private matchesBudget(pricePerNight: string, budget?: string): boolean {
    if (!budget) {
      return true;
    }

    const values = pricePerNight.match(/\d+/g)?.map(Number) || [];
    const price = values.length === 0 ? 0 : values.length === 1 ? values[0] : Math.round((values[0] + values[1]) / 2);

    if (budget === 'budget') {
      return price <= 110;
    }

    if (budget === 'mid') {
      return price >= 90 && price <= 190;
    }

    return price >= 170;
  }

  private generateExplanation(preferences: CreateRecommendationDto): string {
    const styleName = preferences.travelStyle || 'custom';
    const durationText = preferences.duration || 'flexible';
    const budgetText = preferences.budget || 'mid-range';

    const explanations: Record<string, string> = {
      curator:
        'These selections lean toward refined stays, polished routing, and curated experiences.',
      culturist:
        'This set emphasizes heritage, cultural depth, and cities with strong local character.',
      urbanite:
        'This set focuses on lively destinations, contemporary atmosphere, and city-based discovery.',
      nomad:
        'This set favors movement, open-air experiences, and more adventurous travel pacing.',
    };

    const baseExplanation =
      explanations[styleName] ||
      'These selections build a more useful shortlist based on your profile.';

    return `${baseExplanation} The result also reflects your ${durationText} trip length and ${budgetText} budget.`;
  }
}
