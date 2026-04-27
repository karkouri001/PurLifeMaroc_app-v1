import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { theme } from '../../src/theme/theme';
import { Card, CardMedia, Header, HeroBanner } from '../../src/components/Common';
import { destinations } from '../../src/data/mockData';
import { Destination } from '../../src/types';
import { destinationInsights } from '../../src/data/contentDetails';
import { brandAssets, getDestinationImage } from '../../src/data/imageAssets';

export default function DestinationsListScreen() {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const locale = i18n.language === 'de' ? 'de' : 'en';

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const name = locale === 'de' ? destination.nameDe : destination.nameEn;
      const description =
        locale === 'de' ? destination.descriptionDe : destination.descriptionEn;
      const query = searchQuery.toLowerCase();

      return (
        name.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query)
      );
    });
  }, [locale, searchQuery]);

  const renderDestination = ({ item }: { item: Destination }) => {
    const extra = destinationInsights[item.id as keyof typeof destinationInsights];

    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/(app)/destination-details',
            params: { id: item.id },
          } as never)
        }
        activeOpacity={0.8}
      >
        <Card>
          {getDestinationImage(item.id) ? <CardMedia source={getDestinationImage(item.id)} /> : null}
          <Text style={styles.destinationName}>
            {locale === 'de' ? item.nameDe : item.nameEn}
          </Text>
          <Text style={styles.destinationDescription} numberOfLines={2}>
            {locale === 'de' ? item.descriptionDe : item.descriptionEn}
          </Text>
          {extra ? (
            <Text style={styles.destinationMood}>
              {locale === 'de' ? extra.moodDe : extra.moodEn}
            </Text>
          ) : null}
          <Text style={styles.destinationSeason}>
            {`${t('screens.best-season')}: ${item.bestSeason}`}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('screens.destinations')}
        subtitle={t('screens.explore-moroccan-destinations')}
        onBackPress={() => router.back()}
      />

      <View style={styles.content}>
        <HeroBanner
          eyebrow="Inside Morocco"
          title="Compare destinations by mood"
          description="Photos, travel mood, and seasonal clues help the traveler narrow down the right city faster."
          logoSource={brandAssets.logo}
          style={styles.hero}
        />

        <TextInput
          style={styles.searchInput}
          placeholder={t('screens.search-destinations')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.colors.textMuted}
        />

        <FlatList
          data={filteredDestinations}
          renderItem={renderDestination}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>{t('screens.no-results')}</Text>
              <Text style={styles.emptyStateText}>{t('screens.try-different-search')}</Text>
            </View>
          }
        />
      </View>
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
  hero: {
    marginBottom: theme.spacing.lg,
  },
  searchInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  listContent: {
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  destinationName: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  destinationDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
    marginBottom: theme.spacing.sm,
  },
  destinationMood: {
    ...theme.typography.bodySmall,
    color: theme.colors.primaryDark,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  destinationSeason: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  emptyState: {
    paddingVertical: theme.spacing.xxl,
    alignItems: 'center',
  },
  emptyStateTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  emptyStateText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
});
