import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Card, Header, HeroBanner } from '../../src/components/Common';
import { useAppContext } from '../../src/store/AppContext';
import { theme } from '../../src/theme/theme';
import {
  findContentItem,
  getContentItemDescription,
  getContentItemName,
  getContentMeta,
  getContentTypeLabel,
  getPlanDestinationCount,
  getPreferredTripLength,
} from '../../src/utils/content';

type PlannedEntry = {
  id: string;
  typeLabel: string;
  title: string;
  description: string;
  meta: string;
  day: number;
  type: 'activity' | 'accommodation' | 'destination' | 'restaurant';
  itemId: string;
};

export default function TripPlannerScreen() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const {
    favorites,
    tripPlan,
    addTripItem,
    removeTripItem,
    updateTripItemDay,
    clearTripPlan,
  } = useAppContext();
  const { preferences } = useAppContext();

  const locale = i18n.language === 'de' ? 'de' : 'en';

  const resolvedPlan = useMemo(() => {
    return tripPlan
      .map((entry) => {
        const item = findContentItem(entry.type, entry.itemId);

        if (!item) {
          return null;
        }

        return {
          id: entry.id,
          type: entry.type,
          itemId: entry.itemId,
          day: entry.day,
          typeLabel: getContentTypeLabel(entry.type, locale),
          title: getContentItemName(entry.type, item, locale),
          description: getContentItemDescription(entry.type, item, locale),
          meta: getContentMeta(entry.type, item, locale),
        } satisfies PlannedEntry;
      })
      .filter((entry): entry is PlannedEntry => Boolean(entry))
      .sort((first, second) => {
        if (first.day !== second.day) {
          return first.day - second.day;
        }

        return first.title.localeCompare(second.title);
      });
  }, [locale, tripPlan]);

  const destinationCount = getPlanDestinationCount(tripPlan);
  const recommendedDays = getPreferredTripLength(preferences?.duration ?? null);
  const maxDayInPlan = resolvedPlan.reduce(
    (current, entry) => Math.max(current, entry.day),
    0
  );
  const visibleDays = Array.from(
    { length: Math.max(maxDayInPlan, Math.min(recommendedDays, 7), 1) },
    (_, index) => index + 1
  );

  const importFavorites = async () => {
    await Promise.all(
      favorites.map((favorite, index) =>
        addTripItem(
          favorite.type,
          favorite.itemId,
          Math.min(14, (index % Math.max(recommendedDays, 1)) + 1)
        )
      )
    );
  };

  const openPlannedEntry = (entry: PlannedEntry) => {
    if (entry.type === 'destination') {
      router.push({
        pathname: '/(app)/destination-details',
        params: { id: entry.itemId },
      } as never);
      return;
    }

    if (entry.type === 'activity') {
      router.push({
        pathname: '/(app)/activity-details',
        params: { id: entry.itemId },
      } as never);
      return;
    }

    if (entry.type === 'accommodation') {
      router.push({
        pathname: '/(app)/accommodation-details',
        params: { id: entry.itemId },
      } as never);
      return;
    }

    router.push('/(app)/eat-drink' as never);
  };

  return (
    <View style={styles.container}>
      <Header
        title={locale === 'de' ? 'Trip planner' : 'Trip planner'}
        subtitle={
          locale === 'de'
            ? 'Build a simple route from saved ideas'
            : 'Build a simple route from saved ideas'
        }
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <HeroBanner
          eyebrow={locale === 'de' ? 'Personal route' : 'Personal route'}
          title={locale === 'de' ? 'Turn ideas into a plan' : 'Turn ideas into a plan'}
          description={
            locale === 'de'
              ? 'Add places, stays, activities, and dining ideas, then spread them across days.'
              : 'Add places, stays, activities, and dining ideas, then spread them across days.'
          }
          chips={[
            `${tripPlan.length} ${locale === 'de' ? 'items' : 'items'}`,
            `${destinationCount} ${locale === 'de' ? 'destinations' : 'destinations'}`,
            `${Math.max(maxDayInPlan, recommendedDays)} ${locale === 'de' ? 'days' : 'days'}`,
          ]}
        />

        <View style={styles.actionsWrap}>
          <Button
            title={locale === 'de' ? 'Add from search' : 'Add from search'}
            onPress={() => router.push('/(app)/search' as never)}
            size="small"
          />
          <Button
            title={locale === 'de' ? 'Estimate budget' : 'Estimate budget'}
            onPress={() => router.push('/(app)/budget-estimator' as never)}
            size="small"
            variant="secondary"
            style={styles.actionButton}
          />
        </View>

        {favorites.length > 0 ? (
          <Card>
            <Text style={styles.utilityTitle}>
              {locale === 'de' ? 'Start from your saved shortlist' : 'Start from your saved shortlist'}
            </Text>
            <Text style={styles.utilityText}>
              {locale === 'de'
                ? 'Import saved places, stays, activities, and dining ideas directly into the trip plan.'
                : 'Import saved places, stays, activities, and dining ideas directly into the trip plan.'}
            </Text>
            <View style={styles.utilityActions}>
              <Button
                title={locale === 'de' ? 'Import favorites' : 'Import favorites'}
                onPress={() => {
                  void importFavorites();
                }}
                size="small"
              />
              {tripPlan.length > 0 ? (
                <Button
                  title={locale === 'de' ? 'Clear plan' : 'Clear plan'}
                  onPress={() => {
                    void clearTripPlan();
                  }}
                  size="small"
                  variant="outline"
                  style={styles.utilityButton}
                />
              ) : null}
            </View>
          </Card>
        ) : null}

        {resolvedPlan.length === 0 ? (
          <Card>
            <Text style={styles.emptyTitle}>
              {locale === 'de' ? 'Your plan is empty' : 'Your plan is empty'}
            </Text>
            <Text style={styles.emptyText}>
              {locale === 'de'
                ? 'Start from search, destination details, or your favorites and add items to the plan.'
                : 'Start from search, destination details, or your favorites and add items to the plan.'}
            </Text>
          </Card>
        ) : null}

        {visibleDays.map((day) => {
          const dayEntries = resolvedPlan.filter((entry) => entry.day === day);

          if (dayEntries.length === 0) {
            return null;
          }

          return (
            <View key={day} style={styles.daySection}>
              <Text style={styles.dayTitle}>{`Day ${day}`}</Text>
              {dayEntries.map((entry) => (
                <Card key={entry.id} variant="elevated">
                  <View style={styles.entryHeader}>
                    <View style={styles.entryTypeBadge}>
                      <Text style={styles.entryTypeText}>{entry.typeLabel}</Text>
                    </View>
                    <Text style={styles.entryMeta}>{entry.meta}</Text>
                  </View>

                  <Text style={styles.entryTitle}>{entry.title}</Text>
                  <Text style={styles.entryDescription}>{entry.description}</Text>

                  <View style={styles.entryActions}>
                    <TouchableOpacity
                      onPress={() => {
                        void updateTripItemDay(entry.id, Math.max(1, entry.day - 1));
                      }}
                      style={styles.inlineAction}
                    >
                      <Text style={styles.inlineActionText}>
                        {locale === 'de' ? 'Earlier day' : 'Earlier day'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        void updateTripItemDay(entry.id, Math.min(14, entry.day + 1));
                      }}
                      style={styles.inlineAction}
                    >
                      <Text style={styles.inlineActionText}>
                        {locale === 'de' ? 'Later day' : 'Later day'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => openPlannedEntry(entry)}
                      style={styles.inlineAction}
                    >
                      <Text style={styles.inlineActionText}>
                        {locale === 'de' ? 'Open' : 'Open'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        void removeTripItem(entry.id);
                      }}
                      style={styles.inlineAction}
                    >
                      <Text style={styles.removeActionText}>
                        {locale === 'de' ? 'Remove' : 'Remove'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  contentInner: {
    paddingBottom: theme.spacing.xxxl,
  },
  actionsWrap: {
    flexDirection: 'row',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  actionButton: {
    marginLeft: theme.spacing.sm,
  },
  utilityTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  utilityText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  utilityActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.lg,
  },
  utilityButton: {
    marginLeft: theme.spacing.sm,
  },
  emptyTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  daySection: {
    marginTop: theme.spacing.xl,
  },
  dayTitle: {
    ...theme.typography.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  entryTypeBadge: {
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceAlt,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  entryTypeText: {
    ...theme.typography.caption,
    color: theme.colors.primaryDark,
    fontWeight: '700',
  },
  entryMeta: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    flex: 1,
    textAlign: 'right',
    marginLeft: theme.spacing.md,
  },
  entryTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  entryDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  entryActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.lg,
  },
  inlineAction: {
    marginRight: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  inlineActionText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  removeActionText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    fontWeight: '700',
  },
});
