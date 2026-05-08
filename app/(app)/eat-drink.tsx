import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Header, Card, CardMedia, Button, HeroBanner } from '../../src/components/Common';
import { useAppContext } from '../../src/store/AppContext';
import { restaurants, destinations } from '../../src/data/mockData';
import { Restaurant } from '../../src/types';
import { theme } from '../../src/theme/theme';
import { getDiningImage } from '../../src/data/imageAssets';

export default function EatDrinkScreen() {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const { addFavorite, isFavorited } = useAppContext();
  const locale = i18n.language === 'de' ? 'de' : 'en';

  const getRestaurantName = (restaurant: Restaurant) =>
    locale === 'de' ? restaurant.nameDe : restaurant.nameEn;

  const getRestaurantDescription = (restaurant: Restaurant) =>
    locale === 'de' ? restaurant.descriptionDe : restaurant.descriptionEn;

  const getDestinationName = (destinationId: string) => {
    const destination = destinations.find((item) => item.id === destinationId);
    if (!destination) return destinationId;

    return locale === 'de' ? destination.nameDe : destination.nameEn;
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('eatDrink.title')}
        subtitle={t('eatDrink.subtitle')}
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <HeroBanner
          eyebrow="Taste of Pur Life"
          title="Dining ideas, not reservation widgets"
          description="Dining references from the relaunch workbook, presented as concierge context rather than commercial checkout."
          chips={['Caravane', 'Al Fassia', 'Le Doge']}
        />

        <View style={styles.cardsSection}>
          {restaurants.map((restaurant) => {
            const favorited = isFavorited('restaurant', restaurant.id);
            const imageSource = getDiningImage(restaurant.image);

            return (
              <Card key={restaurant.id} variant="elevated">
                {imageSource ? <CardMedia source={imageSource} /> : null}

                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{getRestaurantName(restaurant)}</Text>
                    <Text style={styles.cardMeta}>
                      {`${getDestinationName(restaurant.destination)} | ${restaurant.cuisine}`}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      if (!favorited) {
                        void addFavorite('restaurant', restaurant.id);
                      }
                    }}
                  >
                    <Text style={styles.favoriteText}>{favorited ? 'Saved' : 'Save'}</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.description}>
                  {getRestaurantDescription(restaurant)}
                </Text>

                <Text style={styles.label}>{t('eatDrink.specialties')}</Text>
                <Text style={styles.value}>{restaurant.specialties.join(', ')}</Text>

                <View style={styles.footerRow}>
                  <View>
                    <Text style={styles.label}>Atmosphere</Text>
                    <Text style={styles.atmosphereValue}>{restaurant.atmosphere}</Text>
                  </View>

                  <Button
                    title={locale === 'de' ? 'Ask concierge' : 'Ask concierge'}
                    onPress={() =>
                      router.push({
                        pathname: '/(app)/enquiry',
                        params: { contextRestaurant: restaurant.id },
                      } as never)
                    }
                    size="small"
                  />
                </View>
              </Card>
            );
          })}
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
  contentInner: {
    paddingBottom: theme.spacing.xxxl,
  },
  cardsSection: {
    marginTop: theme.spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    flexShrink: 1,
  },
  cardMeta: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  favoriteText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '700',
    textAlign: 'right',
  },
  description: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  value: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  atmosphereValue: {
    ...theme.typography.h5,
    color: theme.colors.primaryDark,
  },
});
