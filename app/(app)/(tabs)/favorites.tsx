import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../../src/store/AppContext';
import { useTranslation } from 'react-i18next';
import { Button, Card, HeroBanner } from '../../../src/components/Common';
import { useTopSpacing } from '../../../src/components/AppChrome';
import { GoogleMapCard } from '../../../src/components/GoogleMapCard';
import { theme } from '../../../src/theme/theme';
import {
  destinations,
  activities,
  accommodations,
  restaurants,
} from '../../../src/data/mockData';
import { destinationMapPoints } from '../../../src/data/contentDetails';
import {
  Favorite,
  Destination,
  Activity,
  Accommodation,
  Restaurant,
} from '../../../src/types';

type FavoriteItem = Destination | Activity | Accommodation | Restaurant;

type FavoriteResolvedItem = {
  favoriteId: string;
  type: Favorite['type'];
  item: FavoriteItem;
};

type FavoriteGroup = {
  type: Favorite['type'];
  label: string;
  icon: string;
  items: FavoriteResolvedItem[];
};

export default function FavoritesTab() {
  const router = useRouter();
  const { favorites, removeFavorite } = useAppContext();
  const { i18n } = useTranslation();
  const locale = i18n.language === 'de' ? 'de' : 'en';
  const topSpacing = useTopSpacing(theme.spacing.lg);

  const favoriteGroups: FavoriteGroup[] = useMemo(() => {
    const groups: Record<Favorite['type'], FavoriteGroup> = {
      destination: {
        type: 'destination',
        label: locale === 'de' ? 'Ziele' : 'Destinations',
        icon: 'L',
        items: [],
      },
      activity: {
        type: 'activity',
        label: locale === 'de' ? 'Aktivitaeten' : 'Activities',
        icon: 'A',
        items: [],
      },
      accommodation: {
        type: 'accommodation',
        label: locale === 'de' ? 'Unterkuenfte' : 'Stays',
        icon: 'S',
        items: [],
      },
      restaurant: {
        type: 'restaurant',
        label: locale === 'de' ? 'Dining' : 'Dining',
        icon: 'D',
        items: [],
      },
    };

    favorites.forEach((favorite) => {
      if (favorite.type === 'destination') {
        const item = destinations.find((entry) => entry.id === favorite.itemId);
        if (item) {
          groups.destination.items.push({
            favoriteId: favorite.id,
            type: favorite.type,
            item,
          });
        }
      } else if (favorite.type === 'activity') {
        const item = activities.find((entry) => entry.id === favorite.itemId);
        if (item) {
          groups.activity.items.push({
            favoriteId: favorite.id,
            type: favorite.type,
            item,
          });
        }
      } else if (favorite.type === 'accommodation') {
        const item = accommodations.find((entry) => entry.id === favorite.itemId);
        if (item) {
          groups.accommodation.items.push({
            favoriteId: favorite.id,
            type: favorite.type,
            item,
          });
        }
      } else if (favorite.type === 'restaurant') {
        const item = restaurants.find((entry) => entry.id === favorite.itemId);
        if (item) {
          groups.restaurant.items.push({
            favoriteId: favorite.id,
            type: favorite.type,
            item,
          });
        }
      }
    });

    return Object.values(groups).filter((group) => group.items.length > 0);
  }, [favorites, locale]);

  const shortlistDestinationIds = useMemo(() => {
    const seen = new Set<string>();
    const ids: string[] = [];

    favorites.forEach((favorite) => {
      let destinationId: string | null = null;

      if (favorite.type === 'destination') {
        destinationId = favorite.itemId;
      } else if (favorite.type === 'activity') {
        destinationId =
          activities.find((item) => item.id === favorite.itemId)?.destination || null;
      } else if (favorite.type === 'accommodation') {
        destinationId =
          accommodations.find((item) => item.id === favorite.itemId)?.destination || null;
      } else if (favorite.type === 'restaurant') {
        destinationId =
          restaurants.find((item) => item.id === favorite.itemId)?.destination || null;
      }

      if (destinationId && !seen.has(destinationId)) {
        seen.add(destinationId);
        ids.push(destinationId);
      }
    });

    return ids;
  }, [favorites]);

  const shortlistPoints = shortlistDestinationIds
    .map((destinationId) => destinationMapPoints[destinationId])
    .filter(Boolean);

  const shortlistNames = shortlistDestinationIds
    .map((destinationId) => destinations.find((item) => item.id === destinationId))
    .filter((item): item is Destination => Boolean(item))
    .map((item) => (locale === 'de' ? item.nameDe : item.nameEn));

  const getItemName = (item: FavoriteItem) =>
    locale === 'de' ? item.nameDe : item.nameEn;

  const getItemSubtitle = (item: FavoriteItem) => {
    if ('bestSeason' in item) {
      return item.bestSeason;
    }

    if ('duration' in item) {
      return `${item.duration} | ${item.category}`;
    }

    if ('stayStyle' in item) {
      return item.stayStyle;
    }

    return item.atmosphere;
  };

  const openItem = (entry: FavoriteResolvedItem) => {
    if (entry.type === 'destination') {
      router.push({
        pathname: '/(app)/destination-details',
        params: { id: entry.item.id },
      } as never);
      return;
    }

    if (entry.type === 'activity') {
      router.push({
        pathname: '/(app)/activity-details',
        params: { id: entry.item.id },
      } as never);
      return;
    }

    if (entry.type === 'accommodation') {
      router.push({
        pathname: '/(app)/accommodation-details',
        params: { id: entry.item.id },
      } as never);
    }
  };

  const askAboutItem = (entry: FavoriteResolvedItem) => {
    const params =
      entry.type === 'destination'
        ? { contextDestination: entry.item.id }
        : entry.type === 'activity'
          ? { contextActivity: entry.item.id }
          : entry.type === 'accommodation'
            ? { contextAccommodation: entry.item.id }
            : { contextRestaurant: entry.item.id };

    router.push({
      pathname: '/(app)/enquiry',
      params,
    } as never);
  };

  return (
    <View style={styles.container}>
      {favoriteGroups.length === 0 ? (
        <View style={styles.content}>
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>+</Text>
            <Text style={styles.emptyStateTitle}>
              {locale === 'de' ? 'Noch keine gespeicherten Inhalte' : 'No saved items yet'}
            </Text>
            <Text style={styles.emptyStateText}>
              {locale === 'de'
                ? 'Gespeicherte Inhalte werden hier zur Shortlist. Sie koennen spaeter geoeffnet oder in eine Concierge-Anfrage uebernommen werden.'
                : 'Saved items become a working shortlist here. You can reopen them later or turn them into a concierge request.'}
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.contentInner, { paddingTop: topSpacing }]}
        >
          <HeroBanner
            eyebrow={locale === 'de' ? 'Useful shortlist' : 'Useful shortlist'}
            title={locale === 'de' ? 'Saved items with a purpose' : 'Saved items with a purpose'}
            description={
              locale === 'de'
                ? 'Gespeicherte Inhalte dienen nicht nur zum Wiederfinden. Sie koennen als Shortlist fuer eine Concierge-Anfrage und schnelle Informationssichtung genutzt werden.'
                : 'Saved items are more than bookmarks. They work as a shortlist for concierge outreach and quick information review.'
            }
            chips={[
              `${favorites.length} ${locale === 'de' ? 'gespeichert' : 'saved'}`,
              `${shortlistDestinationIds.length} ${locale === 'de' ? 'Orte' : 'places'}`,
            ]}
          />

          {shortlistPoints.length > 0 ? (
            <GoogleMapCard
              title={locale === 'de' ? 'Your saved places on Google Maps' : 'Your saved places on Google Maps'}
              subtitle={
                shortlistNames.length > 0
                  ? shortlistNames.join(' | ')
                  : undefined
              }
              points={shortlistPoints}
              mode={shortlistPoints.length > 1 ? 'route' : 'place'}
              height={190}
            />
          ) : null}

          <View style={styles.utilityCard}>
            <Text style={styles.utilityTitle}>
              {locale === 'de' ? 'What saved items are for' : 'What saved items are for'}
            </Text>
            <Text style={styles.utilityText}>
              {locale === 'de'
                ? '1. They reopen useful details quickly. 2. They give the concierge immediate context. 3. They keep your information request focused.'
                : '1. They reopen useful details quickly. 2. They give the concierge immediate context. 3. They keep your information request focused.'}
            </Text>
            <View style={styles.utilityActions}>
              <Button
                title={
                  locale === 'de'
                    ? 'Ask concierge about saved items'
                    : 'Ask concierge about saved items'
                }
                onPress={() =>
                  router.push({
                    pathname: '/(app)/enquiry',
                    params: { fromFavorites: '1' },
                  } as never)
                }
                style={styles.utilityButton}
              />
            </View>
          </View>

          {favoriteGroups.map((group) => (
            <View key={group.type} style={styles.group}>
              <View style={styles.groupHeader}>
                <View style={styles.groupIcon}>
                  <Text style={styles.groupIconText}>{group.icon}</Text>
                </View>
                <Text style={styles.groupTitle}>{group.label}</Text>
                <Text style={styles.groupCount}>{group.items.length}</Text>
              </View>

              {group.items.map((entry) => (
                <Card key={entry.favoriteId}>
                  <Text style={styles.itemTitle}>{getItemName(entry.item)}</Text>
                  <Text style={styles.itemSubtitle}>{getItemSubtitle(entry.item)}</Text>

                  <View style={styles.itemActions}>
                    {entry.type !== 'restaurant' ? (
                      <TouchableOpacity
                        onPress={() => openItem(entry)}
                        style={styles.actionButton}
                      >
                        <Text style={styles.actionButtonText}>
                          {locale === 'de' ? 'Open' : 'Open'}
                        </Text>
                      </TouchableOpacity>
                    ) : null}

                    <TouchableOpacity
                      onPress={() => askAboutItem(entry)}
                      style={styles.actionButton}
                    >
                      <Text style={styles.actionButtonText}>
                        {locale === 'de' ? 'Ask concierge' : 'Ask concierge'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => removeFavorite(entry.favoriteId)}
                      style={styles.actionButton}
                    >
                      <Text style={styles.actionRemoveText}>
                        {locale === 'de' ? 'Remove' : 'Remove'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
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
  },
  contentInner: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  utilityCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
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
  utilityButton: {
    marginTop: theme.spacing.lg,
  },
  utilityActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.lg,
  },
  utilitySecondaryButton: {
    marginTop: theme.spacing.lg,
    marginLeft: theme.spacing.sm,
  },
  group: {
    marginBottom: theme.spacing.xl,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  groupIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  groupIconText: {
    ...theme.typography.caption,
    color: theme.colors.primaryDark,
    fontWeight: '700',
  },
  groupTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  groupCount: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  itemTitle: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  itemSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  itemActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.lg,
  },
  actionButton: {
    marginRight: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  actionButtonText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  actionRemoveText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.lg,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  emptyStateTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  emptyStateText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
  },
});
