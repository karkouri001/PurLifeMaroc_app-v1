import { destinations, travelStyles } from '../data/mockData';
import { UserPreferences } from '../types';

type Translator = (key: string) => string;

export const getTravelStyleLabel = (
  travelStyle: string | null,
  language: string
): string | null => {
  if (!travelStyle) {
    return null;
  }

  const match = travelStyles.find((style) => style.id === travelStyle);
  if (!match) {
    return travelStyle;
  }

  return language === 'de' ? match.nameDe : match.nameEn;
};

export const getDurationLabel = (
  duration: UserPreferences['duration'],
  t: Translator
): string | null => {
  if (!duration) {
    return null;
  }

  return t(`onboarding.duration.${duration}`);
};

export const getAccommodationLabel = (
  accommodation: UserPreferences['accommodationPreference'],
  t: Translator
): string | null => {
  if (!accommodation) {
    return null;
  }

  return t(`onboarding.accommodation.${accommodation}`);
};

export const getInterestLabel = (interest: string, t: Translator): string => {
  const knownInterestKeys = [
    'culture',
    'adventure',
    'gastronomy',
    'beach',
    'shopping',
    'history',
  ];

  if (knownInterestKeys.includes(interest)) {
    return t(`onboarding.interests.${interest}`);
  }

  return interest;
};

export const getDestinationLabel = (
  destinationId: string,
  language: string
): string => {
  const destination = destinations.find((item) => item.id === destinationId);

  if (!destination) {
    return destinationId;
  }

  return language === 'de' ? destination.nameDe : destination.nameEn;
};

export const buildPreferenceSignals = (
  preferences: UserPreferences | null,
  language: string,
  t: Translator
): string[] => {
  if (!preferences) {
    return [];
  }

  const signals: string[] = [];
  const travelStyle = getTravelStyleLabel(preferences.travelStyle, language);
  const duration = getDurationLabel(preferences.duration, t);
  const accommodation = getAccommodationLabel(
    preferences.accommodationPreference,
    t
  );

  if (travelStyle) {
    signals.push(`${t('screens.travel-style')}: ${travelStyle}`);
  }

  if (preferences.interests.length > 0) {
    signals.push(
      `${t('onboarding.step4')}: ${preferences.interests
        .map((interest) => getInterestLabel(interest, t))
        .join(', ')}`
    );
  }

  if (preferences.preferredDestinations.length > 0) {
    signals.push(
      `${t('screens.destinations')}: ${preferences.preferredDestinations
        .map((destinationId) => getDestinationLabel(destinationId, language))
        .join(', ')}`
    );
  }

  if (duration) {
    signals.push(`${t('screens.duration')}: ${duration}`);
  }

  if (accommodation) {
    signals.push(`${t('navigation.accommodation')}: ${accommodation}`);
  }

  return signals;
};

export const buildPreferenceUsageNotes = (language: string): string[] => {
  if (language === 'de') {
    return [
      'Reisestil, Interessen und Aufenthaltsdauer steuern die Reihenfolge der Empfehlungen.',
      'Der Unterkunftsstil priorisiert passende Aufenthalte statt zufaellige Ergebnisse.',
      'Bevorzugte Ziele werden in den Concierge-Ablauf uebernommen, damit die E-Mail-Anfrage mit echtem Kontext startet.',
    ];
  }

  return [
    'Travel style, interests, and trip length rank destinations and activities for the user.',
    'Stay style prioritizes accommodation that fits the traveler instead of showing a generic list.',
    'Preferred destinations carry into the concierge flow so the email request starts with real context.',
  ];
};
