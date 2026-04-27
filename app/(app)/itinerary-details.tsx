import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Card, Header, HeroBanner } from '../../src/components/Common';
import { GoogleMapCard } from '../../src/components/GoogleMapCard';
import {
  destinationMapPoints,
  itineraryDetails,
} from '../../src/data/contentDetails';
import { signatureItineraries } from '../../src/data/conciergeData';
import { destinations } from '../../src/data/mockData';
import { theme } from '../../src/theme/theme';
import type { MapPoint } from '../../src/data/contentDetails';
import {
  getActivityImage,
  getDestinationImage,
} from '../../src/data/imageAssets';

export default function ItineraryDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { i18n, t } = useTranslation();
  const locale = i18n.language === 'de' ? 'de' : 'en';

  const itinerary = signatureItineraries.find((item) => item.id === id);

  if (!itinerary) {
    return (
      <View style={styles.container}>
        <Header title={t('screens.not-found')} onBackPress={() => router.back()} />
      </View>
    );
  }

  const detail = itineraryDetails[itinerary.id as keyof typeof itineraryDetails];
  const mapPoints: MapPoint[] = itinerary.destinations
    .map((destinationId) => destinationMapPoints[destinationId])
    .filter((point): point is MapPoint => Boolean(point));

  return (
    <View style={styles.container}>
      <Header
        title={locale === 'de' ? itinerary.nameDe : itinerary.nameEn}
        subtitle="Popular route"
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <HeroBanner
          eyebrow={locale === 'de' ? itinerary.themeDe : itinerary.themeEn}
          title={locale === 'de' ? itinerary.nameDe : itinerary.nameEn}
          description={locale === 'de' ? itinerary.summaryDe : itinerary.summaryEn}
          accent={itinerary.duration}
          chips={itinerary.destinations.map((destinationId) => {
            const destination = destinations.find((item) => item.id === destinationId);
            if (!destination) return destinationId;
            return locale === 'de' ? destination.nameDe : destination.nameEn;
          })}
        />

        <GoogleMapCard
          title="Google Maps route"
          subtitle={
            detail
              ? locale === 'de'
                ? `${detail.paceDe} | ${detail.idealForDe}`
                : `${detail.paceEn} | ${detail.idealForEn}`
              : undefined
          }
          points={mapPoints}
          mode="route"
          height={190}
        />

        {detail ? (
          <Card>
            <Text style={styles.sectionLabel}>Route highlights</Text>
            {(locale === 'de' ? detail.highlightsDe : detail.highlightsEn).map((item) => (
              <View key={item} style={styles.listRow}>
                <View style={styles.dot} />
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </Card>
        ) : null}

        {detail?.flowSteps?.length ? (
          <Card>
            <Text style={styles.sectionLabel}>Route flow</Text>
            {detail.flowSteps.map((step) => {
              const imageSource =
                step.imageType === 'activity'
                  ? getActivityImage(step.imageId)
                  : getDestinationImage(step.imageId);

              return (
                <View key={step.id} style={styles.flowCard}>
                  {imageSource ? (
                    <Image source={imageSource} style={styles.flowImage} resizeMode="cover" />
                  ) : null}
                  <Text style={styles.flowTitle}>
                    {locale === 'de' ? step.titleDe : step.titleEn}
                  </Text>
                  <Text style={styles.flowText}>
                    {locale === 'de' ? step.textDe : step.textEn}
                  </Text>
                </View>
              );
            })}
          </Card>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={locale === 'de' ? 'Ask concierge about this route' : 'Ask concierge about this route'}
          onPress={() =>
            router.push({
              pathname: '/(app)/enquiry',
              params: { routeId: itinerary.id },
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
  flowCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  flowImage: {
    width: '100%',
    height: 140,
  },
  flowTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  flowText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    backgroundColor: theme.colors.surface,
  },
});
