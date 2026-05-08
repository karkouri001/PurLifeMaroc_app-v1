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
import { Card, CardMedia, Header, HeroBanner } from '../../src/components/Common';
import { activities } from '../../src/data/mockData';
import { Activity } from '../../src/types';
import { getActivityImage } from '../../src/data/imageAssets';

export default function ActivitiesListScreen() {
  const router = useRouter();
  const { destination } = useLocalSearchParams<{ destination?: string }>();
  const { isFavorited, addFavorite } = useAppContext();
  const { i18n, t } = useTranslation();
  const locale = i18n.language === 'de' ? 'de' : 'en';

  const filteredActivities = useMemo(() => {
    if (destination) {
      return activities.filter((activity) => activity.destination === destination);
    }

    return activities;
  }, [destination]);

  const renderActivity = ({ item }: { item: Activity }) => {
    const saved = isFavorited('activity', item.id);
    const imageSource = getActivityImage(item.image);

    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/(app)/activity-details',
            params: { id: item.id },
          } as never)
        }
        activeOpacity={0.8}
      >
        <Card>
          {imageSource ? <CardMedia source={imageSource} /> : null}

          <View style={styles.cardHeader}>
            <Text style={styles.activityName}>
              {locale === 'de' ? item.nameDe : item.nameEn}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (!saved) {
                  void addFavorite('activity', item.id);
                }
              }}
            >
              <Text style={styles.saveText}>{saved ? 'Saved' : 'Save'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.activityDescription} numberOfLines={2}>
            {locale === 'de' ? item.descriptionDe : item.descriptionEn}
          </Text>

          <Text style={styles.activityMeta}>{`${item.duration} | ${item.category}`}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('screens.activities')}
        subtitle={destination ? t('screens.by-destination') : t('screens.all-activities')}
        onBackPress={() => router.back()}
      />

      <FlatList
        style={styles.list}
        data={filteredActivities}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <HeroBanner
            eyebrow="Experiences"
            title="Culture, wellness, coast, and adventure"
            description="Workbook-aligned PLM experiences with context, timing, and service notes instead of checkout details."
            style={styles.hero}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>{t('screens.no-activities')}</Text>
            <Text style={styles.emptyStateText}>{t('screens.no-activities-found')}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    flex: 1,
  },
  hero: {
    marginBottom: theme.spacing.lg,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  activityName: {
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
  activityDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
    marginBottom: theme.spacing.md,
  },
  activityMeta: {
    ...theme.typography.caption,
    color: theme.colors.primaryDark,
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
    textAlign: 'center',
  },
});
