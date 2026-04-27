import {
  BudgetEstimate,
  BudgetEstimateLine,
  TripPlanItem,
  UserPreferences,
} from '../types';
import {
  extractNumericRange,
  findContentItem,
  getContentPriceLabel,
} from '../utils/content';

type DiningPace = 'light' | 'balanced' | 'signature';

type BudgetEstimatorInput = {
  travelers: number;
  nights: number;
  includeChauffeur: boolean;
  diningPace: DiningPace;
  tripPlan: TripPlanItem[];
  preferences: UserPreferences | null;
};

function roundMoney(value: number) {
  return Math.round(value / 10) * 10;
}

function averageRange(ranges: [number, number][]): [number, number] | null {
  if (ranges.length === 0) {
    return null;
  }

  const minimum =
    ranges.reduce((sum, range) => sum + range[0], 0) / ranges.length;
  const maximum =
    ranges.reduce((sum, range) => sum + range[1], 0) / ranges.length;

  return [minimum, maximum];
}

function getFallbackStayRange(preferences: UserPreferences | null): [number, number] {
  if (preferences?.accommodationPreference === 'luxury') {
    return [180, 320];
  }

  if (preferences?.accommodationPreference === 'boutique') {
    return [110, 180];
  }

  if (preferences?.accommodationPreference === 'traditional') {
    return [75, 120];
  }

  if (preferences?.accommodationPreference === 'camp') {
    return [90, 160];
  }

  if (preferences?.budget === 'budget') {
    return [70, 110];
  }

  if (preferences?.budget === 'mid') {
    return [120, 200];
  }

  if (preferences?.budget === 'luxury') {
    return [220, 360];
  }

  return [110, 190];
}

function getFallbackActivityRange(preferences: UserPreferences | null): [number, number] {
  if (preferences?.budget === 'luxury') {
    return [70, 140];
  }

  if (preferences?.budget === 'mid') {
    return [45, 90];
  }

  return [25, 60];
}

function getDiningRange(
  diningPace: DiningPace,
  travelers: number,
  nights: number
): [number, number] {
  const perTravelerPerDay =
    diningPace === 'light'
      ? [20, 35]
      : diningPace === 'balanced'
        ? [35, 60]
        : [60, 110];

  return [
    perTravelerPerDay[0] * travelers * nights,
    perTravelerPerDay[1] * travelers * nights,
  ];
}

function getTransportRange(
  includeChauffeur: boolean,
  nights: number
): [number, number] {
  if (includeChauffeur) {
    return [70 * nights, 120 * nights];
  }

  return [20 * nights, 35 * nights];
}

function extractPlannedRanges(
  type: 'activity' | 'accommodation' | 'restaurant',
  tripPlan: TripPlanItem[]
): [number, number][] {
  return tripPlan.reduce<[number, number][]>((ranges, entry) => {
    if (entry.type !== type) {
      return ranges;
    }

    const item = findContentItem(type, entry.itemId);

    if (!item) {
      return ranges;
    }

    const priceLabel = getContentPriceLabel(type, item);

    if (!priceLabel) {
      return ranges;
    }

    const range = extractNumericRange(priceLabel);

    if (range) {
      ranges.push(range);
    }

    return ranges;
  }, []);
}

export class BudgetEstimator {
  static estimate({
    travelers,
    nights,
    includeChauffeur,
    diningPace,
    tripPlan,
    preferences,
  }: BudgetEstimatorInput): BudgetEstimate {
    const normalizedTravelers = Math.max(1, Math.round(travelers));
    const normalizedNights = Math.max(1, Math.round(nights));

    const accommodationRanges = extractPlannedRanges('accommodation', tripPlan);
    const activityRanges = extractPlannedRanges('activity', tripPlan);
    const restaurantRanges = extractPlannedRanges('restaurant', tripPlan);

    const stayRange = averageRange(accommodationRanges) || getFallbackStayRange(preferences);
    const activityRange =
      activityRanges.length > 0
        ? [
            activityRanges.reduce((sum, range) => sum + range[0], 0) *
              normalizedTravelers,
            activityRanges.reduce((sum, range) => sum + range[1], 0) *
              normalizedTravelers,
          ]
        : (() => {
            const fallback = getFallbackActivityRange(preferences);
            const activityCount = Math.max(2, Math.ceil(normalizedNights / 2));
            return [
              fallback[0] * activityCount * normalizedTravelers,
              fallback[1] * activityCount * normalizedTravelers,
            ];
          })();

    const diningRange = getDiningRange(
      diningPace,
      normalizedTravelers,
      normalizedNights
    );
    const transportRange = getTransportRange(includeChauffeur, normalizedNights);

    const restaurantSupplement: [number, number] =
      restaurantRanges.length > 0
        ? [
            restaurantRanges.reduce((sum, range) => sum + range[0], 0) *
              normalizedTravelers,
            restaurantRanges.reduce((sum, range) => sum + range[1], 0) *
              normalizedTravelers,
          ]
        : [0, 0];

    const lines: BudgetEstimateLine[] = [
      {
        id: 'stay',
        label: 'Stay',
        minimum: roundMoney(stayRange[0] * normalizedNights),
        maximum: roundMoney(stayRange[1] * normalizedNights),
        note:
          accommodationRanges.length > 0
            ? 'Based on selected stays'
            : 'Estimated from your travel profile',
      },
      {
        id: 'activities',
        label: 'Experiences',
        minimum: roundMoney(activityRange[0]),
        maximum: roundMoney(activityRange[1]),
        note:
          activityRanges.length > 0
            ? 'Using items added to your plan'
            : 'Estimated from trip length',
      },
      {
        id: 'dining',
        label: 'Dining',
        minimum: roundMoney(diningRange[0] + restaurantSupplement[0]),
        maximum: roundMoney(diningRange[1] + restaurantSupplement[1]),
        note:
          restaurantRanges.length > 0
            ? 'Daily dining plus planned dining stops'
            : 'Daily meal allowance',
      },
      {
        id: 'transport',
        label: includeChauffeur ? 'Chauffeur & transfers' : 'Local transfers',
        minimum: roundMoney(transportRange[0]),
        maximum: roundMoney(transportRange[1]),
      },
    ];

    const totalMinimum = lines.reduce((sum, line) => sum + line.minimum, 0);
    const totalMaximum = lines.reduce((sum, line) => sum + line.maximum, 0);

    return {
      nights: normalizedNights,
      travelers: normalizedTravelers,
      lines,
      totalMinimum,
      totalMaximum,
    };
  }
}
