import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Header, Card, HeroBanner, StatChip } from '../../src/components/Common';
import { brandAssets } from '../../src/data/imageAssets';
import { insightsUtils } from '../../src/utils/helpers';
import { theme } from '../../src/theme/theme';

export default function InsightsScreen() {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const insights = useMemo(() => insightsUtils.generateMockInsights(), []);
  const locale = i18n.language === 'de' ? 'de' : 'en';

  return (
    <View style={styles.container}>
      <Header
        title={t('insights.title')}
        subtitle={t('insights.subtitle')}
        onBackPress={() => router.back()}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <HeroBanner
          eyebrow={locale === 'de' ? 'Mock analytics' : 'Mock analytics'}
          title={
            locale === 'de'
              ? 'Useful signals for a guidance-first MVP'
              : 'Useful signals for a guidance-first MVP'
          }
          description={
            locale === 'de'
              ? 'Statt Booking-Daten zu simulieren, zeigt diese Seite, welche Orte, Routen und Chauffeur-Profile im Produkt besonders gefragt waeren.'
              : 'Instead of pretending to have booking data, this page shows which places, routes, and chauffeur profiles would matter most in the product.'
          }
          logoSource={brandAssets.logo}
          chips={[insights.topDestination.name, insights.topItinerary.name, insights.topDriver.name]}
        />

        <View style={styles.statsRow}>
          <StatChip label={t('insights.topDestination')} value={insights.topDestination.name} />
          <View style={styles.spacer} />
          <StatChip label={t('insights.topTravelStyle')} value={insights.topTravelStyle.name} />
        </View>

        <View style={styles.statsRow}>
          <StatChip label={locale === 'de' ? 'Top route idea' : 'Top route idea'} value={insights.topItinerary.name} />
          <View style={styles.spacer} />
          <StatChip label={locale === 'de' ? 'Top driver' : 'Top driver'} value={insights.topDriver.name} />
        </View>

        <Card variant="elevated">
          <Text style={styles.cardLabel}>{t('insights.topActivity')}</Text>
          <Text style={styles.cardValue}>{insights.topActivity.name}</Text>
          <Text style={styles.cardCount}>{`${insights.topActivity.count} saves`}</Text>
        </Card>

        <Card variant="elevated">
          <Text style={styles.cardLabel}>{t('insights.topAccommodation')}</Text>
          <Text style={styles.cardValue}>{insights.topAccommodation.name}</Text>
          <Text style={styles.cardCount}>{`${insights.topAccommodation.count} likes`}</Text>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('insights.trends')}</Text>
          {insights.trendingExperiences.map((experience) => (
            <Card key={experience.name}>
              <View style={styles.trendHeader}>
                <Text style={styles.trendName}>{experience.name}</Text>
                <Text style={styles.trendValue}>{`+${experience.trend}%`}</Text>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { width: `${Math.min(experience.trend, 100)}%` },
                  ]}
                />
              </View>
            </Card>
          ))}
        </View>
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
  statsRow: {
    flexDirection: 'row',
    marginTop: theme.spacing.lg,
  },
  spacer: {
    width: theme.spacing.md,
  },
  cardLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  cardValue: {
    ...theme.typography.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  cardCount: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
  },
  section: {
    marginTop: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  trendName: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  trendValue: {
    ...theme.typography.body,
    color: theme.colors.primaryDark,
    fontWeight: '700',
  },
  barTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: theme.colors.surfaceAlt,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: theme.colors.primary,
  },
});
