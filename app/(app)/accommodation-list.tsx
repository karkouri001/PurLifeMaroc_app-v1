import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '../../src/store/AppContext';
import { useTranslation } from 'react-i18next';
import { theme } from '../../src/theme/theme';
import { Badge, Card, CardMedia, Header, HeroBanner } from '../../src/components/Common';
import { accommodations } from '../../src/data/mockData';
import { Accommodation } from '../../src/types';
import { getAccommodationImage } from '../../src/data/imageAssets';

export default function AccommodationListScreen() {
  const router = useRouter();
  const { destination } = useLocalSearchParams<{ destination?: string }>();
  const { isFavorited, addFavorite, preferences } = useAppContext();
  const { i18n, t } = useTranslation();
  const locale = i18n.language === 'de' ? 'de' : 'en';

  const filteredAccommodations = useMemo(() => {
    let filtered = accommodations;

    if (destination) {
      filtered = filtered.filter((item) => item.destination === destination);
    }

    if (preferences?.accommodationPreference) {
      filtered = filtered.sort((first, second) => {
        const firstMatch = first.category === preferences.accommodationPreference ? 0 : 1;
        const secondMatch = second.category === preferences.accommodationPreference ? 0 : 1;
        return firstMatch - secondMatch;
      });
    }

    return filtered;
  }, [destination, preferences]);

  const renderAccommodation = ({ item }: { item: Accommodation }) => {
    const saved = isFavorited('accommodation', item.id);
    const imageSource = getAccommodationImage(item.image);

    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/(app)/accommodation-details',
            params: { id: item.id },
          } as never)
        }
        activeOpacity={0.8}
      >
        <Card>
          {imageSource ? <CardMedia source={imageSource} /> : null}

          <View style={styles.cardHeader}>
            <Text style={styles.nameText}>
              {locale === 'de' ? item.nameDe : item.nameEn}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (!saved) {
                  void addFavorite('accommodation', item.id);
                }
              }}
            >
              <Text style={styles.saveText}>{saved ? 'Saved' : 'Save'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.descriptionText} numberOfLines={2}>
            {locale === 'de' ? item.descriptionDe : item.descriptionEn}
          </Text>

          <View style={styles.footerRow}>
            <Badge label={item.category} />
            <Text style={styles.styleText}>{item.stayStyle}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('screens.accommodation')}
        subtitle={destination ? t('screens.by-destination') : t('screens.all-options')}
        onBackPress={() => router.back()}
      />

      <View style={styles.content}>
        <HeroBanner
          eyebrow="Stays"
          title="Pur Life Living"
          description="Luxury Living and Experience Living references from the website relaunch workbook."
          style={styles.hero}
        />

        <FlatList
          data={filteredAccommodations}
          renderItem={renderAccommodation}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>{t('screens.no-accommodation')}</Text>
              <Text style={styles.emptyText}>{t('screens.no-accommodation-found')}</Text>
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
  listContent: {
    paddingBottom: theme.spacing.xxxl,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  nameText: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    marginRight: theme.spacing.md,
  },
  saveText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '700',
    textAlign: 'right',
  },
  descriptionText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
    marginBottom: theme.spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleText: {
    ...theme.typography.body,
    color: theme.colors.primaryDark,
    fontWeight: '700',
  },
  emptyState: {
    paddingVertical: theme.spacing.xxl,
    alignItems: 'center',
  },
  emptyTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
