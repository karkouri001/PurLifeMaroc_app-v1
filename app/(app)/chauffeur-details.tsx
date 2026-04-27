import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Card, Header, HeroBanner } from '../../src/components/Common';
import { GoogleMapCard } from '../../src/components/GoogleMapCard';
import {
  chauffeurDetails,
  destinationMapPoints,
} from '../../src/data/contentDetails';
import { privateChauffeurs } from '../../src/data/conciergeData';
import { theme } from '../../src/theme/theme';
import type { MapPoint } from '../../src/data/contentDetails';

export default function ChauffeurDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { i18n, t } = useTranslation();
  const locale = i18n.language === 'de' ? 'de' : 'en';

  const driver = privateChauffeurs.find((item) => item.id === id);

  if (!driver) {
    return (
      <View style={styles.container}>
        <Header title={t('screens.not-found')} onBackPress={() => router.back()} />
      </View>
    );
  }

  const detail = chauffeurDetails[driver.id as keyof typeof chauffeurDetails];
  const coveragePoints: MapPoint[] = detail?.coveragePointIds
    ? detail.coveragePointIds
        .map((pointId) => destinationMapPoints[pointId])
        .filter((point): point is MapPoint => Boolean(point))
    : [];

  return (
    <View style={styles.container}>
      <Header
        title={driver.name}
        subtitle="Private chauffeur profile"
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <HeroBanner
          eyebrow={driver.baseCity}
          title={driver.name}
          description={locale === 'de' ? driver.summaryDe : driver.summaryEn}
          accent={`${locale === 'de' ? driver.vehicleDe : driver.vehicleEn} | ${driver.rating}/5`}
          chips={driver.languages}
        />

        {coveragePoints.length > 0 ? (
          <GoogleMapCard
            title="Google Maps coverage"
            subtitle={detail ? (locale === 'de' ? detail.drivingStyleDe : detail.drivingStyleEn) : undefined}
            points={coveragePoints}
          />
        ) : null}

        <Card>
          <Text style={styles.sectionLabel}>Experience</Text>
          <Text style={styles.bodyText}>
            {detail ? (locale === 'de' ? detail.experienceDe : detail.experienceEn) : ''}
          </Text>
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>Best for</Text>
          <Text style={styles.bodyText}>
            {detail ? (locale === 'de' ? detail.idealForDe : detail.idealForEn) : ''}
          </Text>
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>Specialties</Text>
          {(locale === 'de' ? driver.specialtiesDe : driver.specialtiesEn).map((item) => (
            <View key={item} style={styles.listRow}>
              <View style={styles.dot} />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={locale === 'de' ? 'Ask concierge for this driver' : 'Ask concierge for this driver'}
          onPress={() =>
            router.push({
              pathname: '/(app)/enquiry',
              params: { driverId: driver.id },
            } as never)
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
  contentInner: {
    paddingBottom: theme.spacing.xxxl,
  },
  sectionLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  bodyText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.md,
    marginTop: 6,
  },
  listText: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.textPrimary,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    backgroundColor: theme.colors.surface,
  },
});
