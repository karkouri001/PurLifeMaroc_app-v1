import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '../../src/store/AppContext';
import { useTranslation } from 'react-i18next';
import { theme } from '../../src/theme/theme';
import { Badge, Button, Card, Header, HeroBanner } from '../../src/components/Common';
import { accommodations, destinations } from '../../src/data/mockData';
import { getAccommodationImage } from '../../src/data/imageAssets';
import { GoogleMapCard } from '../../src/components/GoogleMapCard';
import { destinationMapPoints } from '../../src/data/contentDetails';

export default function AccommodationDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addFavorite, isFavorited } = useAppContext();
  const { i18n, t } = useTranslation();

  const accommodation = accommodations.find((item) => item.id === id);
  const destination = accommodation
    ? destinations.find((item) => item.id === accommodation.destination)
    : null;
  const destinationPoint = accommodation
    ? destinationMapPoints[accommodation.destination]
    : null;

  if (!accommodation) {
    return (
      <View style={styles.container}>
        <Header title={t('screens.not-found')} onBackPress={() => router.back()} />
      </View>
    );
  }

  const locale = i18n.language === 'de' ? 'de' : 'en';
  const isFav = isFavorited('accommodation', accommodation.id);

  return (
    <View style={styles.container}>
      <Header
        title={locale === 'de' ? accommodation.nameDe : accommodation.nameEn}
        onBackPress={() => router.back()}
        rightIcon={
          <TouchableOpacity
            onPress={() => {
              if (!isFav) {
                void addFavorite('accommodation', accommodation.id);
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
          eyebrow="Stay guide"
          title={locale === 'de' ? accommodation.nameDe : accommodation.nameEn}
          description={
            locale === 'de'
              ? accommodation.descriptionDe
              : accommodation.descriptionEn
          }
          accent={
            destination
              ? `Destination: ${locale === 'de' ? destination.nameDe : destination.nameEn}`
              : undefined
          }
          chips={[accommodation.category, accommodation.stayStyle]}
          imageSource={getAccommodationImage(accommodation.image)}
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

        <Card>
          <Text style={styles.sectionLabel}>{t('activities.category')}</Text>
          <Badge label={accommodation.category} />
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>Pur Life Living style</Text>
          <Text style={styles.primaryValue}>{accommodation.stayStyle}</Text>
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>{t('screens.amenities')}</Text>
          {accommodation.amenities.map((amenity) => (
            <View key={amenity} style={styles.listRow}>
              <View style={styles.listDot} />
              <Text style={styles.listText}>{amenity}</Text>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>Stay guidance</Text>
          <Text style={styles.bodyText}>
            {locale === 'de'
              ? 'Die App praesentiert diese Unterkunft als kuratierte Option. Sie zeigt keine Live-Verfuegbarkeit und verarbeitet keine Reservierungen.'
              : 'The app presents this stay as a curated option. It does not show live availability or process reservations.'}
          </Text>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={locale === 'de' ? 'Ask about this stay' : 'Ask about this stay'}
          onPress={() =>
            router.push({
              pathname: '/(app)/enquiry',
              params: { contextAccommodation: accommodation.id },
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
