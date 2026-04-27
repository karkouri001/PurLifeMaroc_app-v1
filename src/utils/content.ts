import {
  accommodations,
  activities,
  destinations,
  restaurants,
} from '../data/mockData';
import {
  Accommodation,
  Activity,
  ContentType,
  Destination,
  Restaurant,
  TripPlanItem,
  UserPreferences,
} from '../types';

export type ContentItem = Destination | Activity | Accommodation | Restaurant;

export const contentTypes: ContentType[] = [
  'destination',
  'activity',
  'accommodation',
  'restaurant',
];

export function getContentCollection(type: ContentType): ContentItem[] {
  if (type === 'destination') {
    return destinations;
  }

  if (type === 'activity') {
    return activities;
  }

  if (type === 'accommodation') {
    return accommodations;
  }

  return restaurants;
}

export function findContentItem(type: ContentType, itemId: string): ContentItem | null {
  return getContentCollection(type).find((entry) => entry.id === itemId) || null;
}

export function getContentItemName(
  type: ContentType,
  item: ContentItem,
  language: string
): string {
  if (type === 'destination') {
    const destination = item as Destination;
    return language === 'de' ? destination.nameDe : destination.nameEn;
  }

  if (type === 'activity') {
    const activity = item as Activity;
    return language === 'de' ? activity.nameDe : activity.nameEn;
  }

  if (type === 'accommodation') {
    const accommodation = item as Accommodation;
    return language === 'de' ? accommodation.nameDe : accommodation.nameEn;
  }

  const restaurant = item as Restaurant;
  return language === 'de' ? restaurant.nameDe : restaurant.nameEn;
}

export function getContentItemDescription(
  type: ContentType,
  item: ContentItem,
  language: string
): string {
  if (type === 'destination') {
    const destination = item as Destination;
    return language === 'de' ? destination.descriptionDe : destination.descriptionEn;
  }

  if (type === 'activity') {
    const activity = item as Activity;
    return language === 'de' ? activity.descriptionDe : activity.descriptionEn;
  }

  if (type === 'accommodation') {
    const accommodation = item as Accommodation;
    return language === 'de'
      ? accommodation.descriptionDe
      : accommodation.descriptionEn;
  }

  const restaurant = item as Restaurant;
  return language === 'de' ? restaurant.descriptionDe : restaurant.descriptionEn;
}

export function getDestinationIdForContent(
  type: ContentType,
  item: ContentItem
): string | null {
  if (type === 'destination') {
    return (item as Destination).id;
  }

  return (item as Activity | Accommodation | Restaurant).destination;
}

export function getContentPriceLabel(
  type: ContentType,
  item: ContentItem
): string | null {
  if (type === 'activity') {
    return (item as Activity).priceRange;
  }

  if (type === 'accommodation') {
    return (item as Accommodation).pricePerNight;
  }

  if (type === 'restaurant') {
    return (item as Restaurant).priceRange;
  }

  return null;
}

export function getContentMeta(
  type: ContentType,
  item: ContentItem,
  language: string
): string {
  if (type === 'destination') {
    const destination = item as Destination;
    return `${language === 'de' ? 'Best season' : 'Best season'}: ${
      destination.bestSeason
    }`;
  }

  if (type === 'activity') {
    const activity = item as Activity;
    return `${activity.category} | ${activity.duration}`;
  }

  if (type === 'accommodation') {
    const accommodation = item as Accommodation;
    return `${accommodation.category} | ${accommodation.pricePerNight}`;
  }

  const restaurant = item as Restaurant;
  return `${restaurant.cuisine} | ${restaurant.priceRange}`;
}

export function getContentTypeLabel(type: ContentType, language: string): string {
  if (type === 'destination') {
    return language === 'de' ? 'Destination' : 'Destination';
  }

  if (type === 'activity') {
    return language === 'de' ? 'Activity' : 'Activity';
  }

  if (type === 'accommodation') {
    return language === 'de' ? 'Stay' : 'Stay';
  }

  return language === 'de' ? 'Dining' : 'Dining';
}

export function extractNumericRange(value: string): [number, number] | null {
  const matches = value.match(/\d+(?:\.\d+)?/g);

  if (!matches || matches.length === 0) {
    return null;
  }

  const numbers = matches.map((entry) => Number(entry)).filter((entry) => !Number.isNaN(entry));

  if (numbers.length === 0) {
    return null;
  }

  if (numbers.length === 1) {
    return [numbers[0], numbers[0]];
  }

  return [numbers[0], numbers[1]];
}

export function matchesBudgetLabel(
  priceLabel: string | null,
  budget: UserPreferences['budget'] | 'all'
): boolean {
  if (budget === 'all' || !priceLabel) {
    return true;
  }

  const range = extractNumericRange(priceLabel);

  if (!range) {
    return true;
  }

  const average = (range[0] + range[1]) / 2;

  if (budget === 'budget') {
    return average <= 60;
  }

  if (budget === 'mid') {
    return average > 60 && average <= 180;
  }

  return average > 180;
}

export function getPreferredTripLength(duration: UserPreferences['duration']): number {
  if (duration === 'weekend') {
    return 3;
  }

  if (duration === 'week') {
    return 7;
  }

  if (duration === 'twoweeks') {
    return 10;
  }

  if (duration === 'month') {
    return 14;
  }

  return 5;
}

export function getPlanDestinationCount(plan: TripPlanItem[]): number {
  const ids = new Set<string>();

  plan.forEach((entry) => {
    const item = findContentItem(entry.type, entry.itemId);

    if (!item) {
      return;
    }

    const destinationId = getDestinationIdForContent(entry.type, item);

    if (destinationId) {
      ids.add(destinationId);
    }
  });

  return ids.size;
}
