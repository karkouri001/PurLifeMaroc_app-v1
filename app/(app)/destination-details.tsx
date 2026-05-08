import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '../../src/store/AppContext';
import { useTranslation } from 'react-i18next';
import { theme } from '../../src/theme/theme';
import { Button, Card, Header, HeroBanner } from '../../src/components/Common';
import { destinations } from '../../src/data/mockData';
import { getDestinationImage } from '../../src/data/imageAssets';
import {
  destinationInsights,
  destinationMapPoints,
} from '../../src/data/contentDetails';
import { GoogleMapCard } from '../../src/components/GoogleMapCard';

export default function DestinationDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addFavorite, isFavorited } = useAppContext();
  const { i18n, t } = useTranslation();

  const destination = destinations.find((item) => item.id === id);

  if (!destination) {
    return (
      <View style={styles.container}>
        <Header title={t('screens.not-found')} onBackPress={() => router.back()} />
      </View>
    );
  }

  const locale = i18n.language === 'de' ? 'de' : 'en';
  const isFav = isFavorited('destination', destination.id);
  const extra = destinationInsights[destination.id as keyof typeof destinationInsights];
  const point = destinationMapPoints[destination.id];

  return (
    <View style={styles.container}>
      <Header
        title={locale === 'de' ? destination.nameDe : destination.nameEn}
        onBackPress={() => router.back()}
        rightIcon={
          <TouchableOpacity
            onPress={() => {
              if (!isFav) {
                void addFavorite('destination', destination.id);
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
          eyebrow="Destination focus"
          title={locale === 'de' ? destination.nameDe : destination.nameEn}
          description={
            locale === 'de'
              ? destination.descriptionDe
              : destination.descriptionEn
          }
          accent={`${locale === 'de' ? 'Best season' : 'Best season'}: ${destination.bestSeason}`}
          imageSource={getDestinationImage(destination.id)}
          chips={destination.highlights.slice(0, 3)}
        />

        {point ? (
          <GoogleMapCard
            title="Google Maps preview"
            subtitle={
              extra
                ? locale === 'de'
                  ? `${extra.regionDe} | ${extra.moodDe}`
                  : `${extra.regionEn} | ${extra.moodEn}`
                : undefined
            }
            points={[point]}
            height={190}
          />
        ) : null}

        <Card>
          <Text style={styles.sectionLabel}>{t('screens.best-season')}</Text>
          <Text style={styles.primaryValue}>{destination.bestSeason}</Text>
        </Card>

        {extra ? (
          <Card>
            <Text style={styles.sectionLabel}>Ideal for</Text>
            {(locale === 'de' ? extra.idealForDe : extra.idealForEn).map((item) => (
              <View key={item} style={styles.listRow}>
                <View style={styles.listDot} />
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </Card>
        ) : null}

        <Card>
          <Text style={styles.sectionLabel}>{t('screens.highlights')}</Text>
          {destination.highlights.map((highlight) => (
            <View key={highlight} style={styles.listRow}>
              <View style={styles.listDot} />
              <Text style={styles.listText}>{highlight}</Text>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>Traveler note</Text>
          <Text style={styles.bodyText}>
            {locale === 'de'
              ? 'Dieser Screen verbindet Bild, Lage, Saison und Stimmung, damit der Nutzer die Destination leichter einordnen kann.'
              : 'This screen combines image, location, season, and travel mood so the destination is easier to understand at a glance.'}
          </Text>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={t('screens.view-activities')}
          onPress={() =>
            router.push({
              pathname: '/(app)/activities-list',
              params: { destination: destination.id },
            } as never)
          }
        />
        <Button
          title={locale === 'de' ? 'Ask concierge' : 'Ask concierge'}
          onPress={() =>
            router.push({
              pathname: '/(app)/enquiry',
              params: { contextDestination: destination.id },
            } as never)
          }
          variant="secondary"
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
  sectionLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  primaryValue: {
    ...theme.typography.h5,
    color: theme.colors.primaryDark,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  listDot: {
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
