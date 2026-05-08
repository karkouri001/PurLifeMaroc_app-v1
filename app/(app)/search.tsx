import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Card, Header, HeroBanner } from '../../src/components/Common';
import { useAppContext } from '../../src/store/AppContext';
import { theme } from '../../src/theme/theme';
import { destinations } from '../../src/data/mockData';
import { ContentType } from '../../src/types';
import {
  contentTypes,
  getContentCollection,
  getContentItemDescription,
  getContentItemName,
  getContentMeta,
  getContentTypeLabel,
  getDestinationIdForContent,
} from '../../src/utils/content';

type SearchEntry = {
  type: ContentType;
  itemId: string;
  title: string;
  description: string;
  meta: string;
  destinationId: string | null;
};

export default function SearchScreen() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { addFavorite, isFavorited } = useAppContext();
  const [query, setQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<ContentType[]>(contentTypes);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);

  const locale = i18n.language === 'de' ? 'de' : 'en';

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return selectedTypes
      .flatMap((type) => {
        const collection = getContentCollection(type);

        return collection
          .map((item) => {
            const title = getContentItemName(type, item, locale);
            const description = getContentItemDescription(type, item, locale);
            const meta = getContentMeta(type, item, locale);
            const destinationId = getDestinationIdForContent(type, item);

            return {
              type,
              itemId: item.id,
              title,
              description,
              meta,
              destinationId,
            } satisfies SearchEntry;
          })
          .filter((entry) => {
            if (selectedDestinationId && entry.destinationId !== selectedDestinationId) {
              return false;
            }

            if (normalizedQuery) {
              const haystack = `${entry.title} ${entry.description} ${entry.meta}`.toLowerCase();
              if (!haystack.includes(normalizedQuery)) {
                return false;
              }
            }

            return true;
          });
      })
      .sort((first, second) => first.title.localeCompare(second.title));
  }, [locale, query, selectedDestinationId, selectedTypes]);

  const toggleType = (type: ContentType) => {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.filter((entry) => entry !== type)
        : [...current, type]
    );
  };

  const openResult = (entry: SearchEntry) => {
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

  const saveResult = async (entry: SearchEntry) => {
    await addFavorite(entry.type, entry.itemId);
  };

  return (
    <View style={styles.container}>
      <Header
        title={locale === 'de' ? 'Search & filters' : 'Search & filters'}
        subtitle={
          locale === 'de'
            ? 'Find places, experiences, stays, and dining ideas'
            : 'Find places, experiences, stays, and dining ideas'
        }
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <HeroBanner
          eyebrow={locale === 'de' ? 'Fast planning' : 'Fast planning'}
          title={locale === 'de' ? 'One place to narrow the trip' : 'One place to narrow the trip'}
          description={
            locale === 'de'
              ? 'Search across all key categories and trim the list by type and destination.'
              : 'Search across all key categories and trim the list by type and destination.'
          }
          chips={[
            `${selectedTypes.length} ${locale === 'de' ? 'types' : 'types'}`,
            `${results.length} ${locale === 'de' ? 'results' : 'results'}`,
          ]}
        />

        <TextInput
          style={styles.searchInput}
          placeholder={locale === 'de' ? 'Search the app...' : 'Search the app...'}
          placeholderTextColor={theme.colors.textMuted}
          value={query}
          onChangeText={setQuery}
        />

        <View style={styles.filtersSection}>
          <Text style={styles.filterTitle}>{locale === 'de' ? 'Type' : 'Type'}</Text>
          <View style={styles.chipRow}>
            {contentTypes.map((type) => {
              const active = selectedTypes.includes(type);

              return (
                <TouchableOpacity
                  key={type}
                  onPress={() => toggleType(type)}
                  style={[styles.filterChip, active ? styles.filterChipActive : undefined]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      active ? styles.filterChipTextActive : undefined,
                    ]}
                  >
                    {getContentTypeLabel(type, locale)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.filtersSection}>
          <Text style={styles.filterTitle}>
            {locale === 'de' ? 'Destination' : 'Destination'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.chipRow}>
              <TouchableOpacity
                onPress={() => setSelectedDestinationId(null)}
                style={[
                  styles.filterChip,
                  !selectedDestinationId ? styles.filterChipActive : undefined,
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    !selectedDestinationId ? styles.filterChipTextActive : undefined,
                  ]}
                >
                  {locale === 'de' ? 'All' : 'All'}
                </Text>
              </TouchableOpacity>
              {destinations.map((destination) => {
                const active = selectedDestinationId === destination.id;

                return (
                  <TouchableOpacity
                    key={destination.id}
                    onPress={() => setSelectedDestinationId(destination.id)}
                    style={[styles.filterChip, active ? styles.filterChipActive : undefined]}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        active ? styles.filterChipTextActive : undefined,
                      ]}
                    >
                      {locale === 'de' ? destination.nameDe : destination.nameEn}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <Text style={styles.resultsCount}>
          {locale === 'de'
            ? `${results.length} curated matches`
            : `${results.length} curated matches`}
        </Text>

        {results.length === 0 ? (
          <Card>
            <Text style={styles.emptyTitle}>
              {locale === 'de' ? 'No matches yet' : 'No matches yet'}
            </Text>
            <Text style={styles.emptyText}>
              {locale === 'de'
                ? 'Try a broader search or open more content types.'
                : 'Try a broader search or open more content types.'}
            </Text>
          </Card>
        ) : null}

        {results.map((entry) => {
          const saved = isFavorited(entry.type, entry.itemId);

          return (
            <View key={`${entry.type}-${entry.itemId}`}>
              <Card variant="elevated">
                <View style={styles.resultHeader}>
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeBadgeText}>
                      {getContentTypeLabel(entry.type, locale)}
                    </Text>
                  </View>
                  <Text style={styles.resultMeta}>{entry.meta}</Text>
                </View>
                <Text style={styles.resultTitle}>{entry.title}</Text>
                <Text style={styles.resultDescription}>{entry.description}</Text>

                <View style={styles.actionsRow}>
                  <Button
                    title={locale === 'de' ? 'Open' : 'Open'}
                    onPress={() => openResult(entry)}
                    size="small"
                  />
                  <Button
                    title={saved ? (locale === 'de' ? 'Saved' : 'Saved') : locale === 'de' ? 'Save' : 'Save'}
                    onPress={() => {
                      void saveResult(entry);
                    }}
                    size="small"
                    variant="secondary"
                    disabled={saved}
                    style={styles.inlineButton}
                  />
                </View>
              </Card>
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
  searchInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    ...theme.typography.body,
    marginTop: theme.spacing.lg,
  },
  filtersSection: {
    marginTop: theme.spacing.xl,
  },
  filterTitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: '700',
  },
  filterChipTextActive: {
    color: theme.colors.white,
  },
  resultsCount: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.sm,
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
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  typeBadge: {
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceAlt,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  typeBadgeText: {
    ...theme.typography.caption,
    color: theme.colors.primaryDark,
    fontWeight: '700',
  },
  resultMeta: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    flex: 1,
    marginLeft: theme.spacing.md,
    textAlign: 'right',
  },
  resultTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  resultDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.lg,
  },
  inlineButton: {
    marginLeft: theme.spacing.sm,
  },
});
