import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '../../src/store/AppContext';
import { useTranslation } from 'react-i18next';
import { theme } from '../../src/theme/theme';
import { Button, Card, Header, HeroBanner, StatChip } from '../../src/components/Common';
import { activities, destinations } from '../../src/data/mockData';
import { getActivityImage } from '../../src/data/imageAssets';
import { GoogleMapCard } from '../../src/components/GoogleMapCard';
import { destinationMapPoints } from '../../src/data/contentDetails';

export default function ActivityDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addFavorite, isFavorited } = useAppContext();
  const { i18n, t } = useTranslation();

  const activity = activities.find((item) => item.id === id);
  const destination = activity
    ? destinations.find((item) => item.id === activity.destination)
    : null;
  const destinationPoint = activity ? destinationMapPoints[activity.destination] : null;

  if (!activity) {
    return (
      <View style={styles.container}>
        <Header title={t('screens.not-found')} onBackPress={() => router.back()} />
      </View>
    );
  }

  const locale = i18n.language === 'de' ? 'de' : 'en';
  const isFav = isFavorited('activity', activity.id);

  return (
    <View style={styles.container}>
      <Header
        title={locale === 'de' ? activity.nameDe : activity.nameEn}
        onBackPress={() => router.back()}
        rightIcon={
          <TouchableOpacity
            onPress={() => {
              if (!isFav) {
                void addFavorite('activity', activity.id);
              }
            }}
          >
            <Text style={styles.favoriteIcon}>{isFav ? 'Saved' : 'Save'}</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <HeroBanner
          eyebrow={activity.category}
          title={locale === 'de' ? activity.nameDe : activity.nameEn}
          description={locale === 'de' ? activity.descriptionDe : activity.descriptionEn}
          accent={
            destination
              ? `Destination: ${locale === 'de' ? destination.nameDe : destination.nameEn}`
              : undefined
          }
          chips={[activity.duration, activity.category]}
          imageSource={getActivityImage(activity.image)}
        />

        {destinationPoint ? (
          <GoogleMapCard
            title="Google Maps preview"
            subtitle={
              destination
                ? `Destination: ${locale === 'de' ? destination.nameDe : destination.nameEn}`
                : undefined
            }
            points={[destinationPoint]}
            height={180}
          />
        ) : null}

        <View style={styles.statsRow}>
          <StatChip label={t('screens.duration')} value={activity.duration} />
          <View style={styles.spacer} />
          <StatChip label={t('activities.category')} value={activity.category} />
        </View>

        <Card>
          <Text style={styles.sectionLabel}>{t('activities.category')}</Text>
          <Text style={styles.primaryValue}>{activity.category}</Text>
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>Why travelers pick it</Text>
          <Text style={styles.bodyText}>
            {locale === 'de'
              ? activity.serviceNote
              : activity.serviceNote}
          </Text>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={locale === 'de' ? 'Ask concierge about this' : 'Ask concierge about this'}
          onPress={() =>
            router.push({
              pathname: '/(app)/enquiry',
              params: { contextActivity: activity.id },
            } as never)
          }
          style={styles.secondaryButton}
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
  contentInner: {
    paddingBottom: theme.spacing.xxxl,
  },
  favoriteIcon: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    marginVertical: theme.spacing.lg,
  },
  spacer: {
    width: theme.spacing.md,
  },
  sectionLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  primaryValue: {
    ...theme.typography.h5,
    color: theme.colors.primaryDark,
  },
  bodyText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    backgroundColor: theme.colors.surface,
  },
  secondaryButton: {
    marginTop: theme.spacing.md,
  },
});
