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
    return `${accommodation.category} | ${accommodation.stayStyle}`;
  }

  const restaurant = item as Restaurant;
  return `${restaurant.cuisine} | ${restaurant.atmosphere}`;
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
