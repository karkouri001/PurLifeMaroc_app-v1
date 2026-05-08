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
import { useTopSpacing } from '../../../src/components/AppChrome';
import { Card, HeroBanner } from '../../../src/components/Common';
import { websiteSections } from '../../../src/data/websiteStructure';
import { brandAssets } from '../../../src/data/imageAssets';
import { theme } from '../../../src/theme/theme';
import { useResponsiveLayout } from '../../../src/theme/responsive';

type ExploreCategory = {
  id: string;
  titleEn: string;
  titleDe: string;
  descriptionEn: string;
  descriptionDe: string;
  route: string;
};

const exploreCategories: ExploreCategory[] = [
  {
    id: 'search',
    titleEn: 'Search & Filters',
    titleDe: 'Search & Filters',
    descriptionEn: 'Search across PLM destinations, experiences, stays, and dining references.',
    descriptionDe: 'Suche in PLM-Destinationen, Erlebnissen, Unterkuenften und Dining-Referenzen.',
    route: '/(app)/search',
  },
  {
    id: 'travel-styles',
    titleEn: 'Travel Styles',
    titleDe: 'Reisestile',
    descriptionEn: 'Start with the four curation styles behind the brand.',
    descriptionDe: 'Starte mit den vier kuratierten Reisestilen der Marke.',
    route: '/(app)/travel-styles-list',
  },
  {
    id: 'destinations',
    titleEn: 'Destinations',
    titleDe: 'Ziele',
    descriptionEn: 'Compare Morocco destinations by mood, season, and highlights.',
    descriptionDe: 'Vergleiche Ziele nach Stimmung, Saison und Highlights.',
    route: '/(app)/destinations-list',
  },
  {
    id: 'activities',
    titleEn: 'Activities',
    titleDe: 'Aktivitaeten',
    descriptionEn: 'Discover culture, wellness, coast, and adventure.',
    descriptionDe: 'Entdecke Kultur, Wellness, Kueste und Abenteuer.',
    route: '/(app)/activities-list',
  },
  {
    id: 'stays',
    titleEn: 'Accommodation',
    titleDe: 'Unterkuenfte',
    descriptionEn: 'Review boutique stays, palaces, and camps.',
    descriptionDe: 'Sieh dir Boutique-Stays, Palaeste und Camps an.',
    route: '/(app)/accommodation-list',
  },
  {
    id: 'dining',
    titleEn: 'Eat & Drink',
    titleDe: 'Essen & Trinken',
    descriptionEn: 'Explore curated dining ideas instead of booking flows.',
    descriptionDe: 'Entdecke kuratierte Dining-Ideen statt Buchungslogik.',
    route: '/(app)/eat-drink',
  },
  {
    id: 'about',
    titleEn: 'About Pur Life',
    titleDe: 'Ueber Pur Life',
    descriptionEn: 'See services, agency details, contacts, and the company map.',
    descriptionDe: 'Sieh Services, Agenturdetails, Kontakte und die Firmenkarte.',
    route: '/(app)/about-purlife',
  },
];

export default function ExploreTab() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const locale = i18n.language === 'de' ? 'de' : 'en';
  const topSpacing = useTopSpacing(theme.spacing.lg);
  const layout = useResponsiveLayout({
    horizontalPadding: theme.spacing.lg,
    gap: theme.spacing.sm,
    minTwoColumnWidth: 180,
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: topSpacing }]}
        showsVerticalScrollIndicator={false}
      >
        <HeroBanner
          eyebrow="Discover"
          title="Explore the curated side of Morocco"
          description={
            locale === 'de'
              ? 'Die Navigation verbindet Orte, Routen, Dining, Chauffeure und Firmeninfos.'
              : 'The navigation connects places, routes, dining, chauffeurs, and company context.'
          }
          logoSource={brandAssets.logo}
          chips={['Destinations', 'Dining', 'Drivers']}
        />

        <View style={styles.signatureSection}>
          <Text style={styles.signatureTitle}>Website relaunch areas</Text>
          {websiteSections.map((section) => (
            <TouchableOpacity
              key={section.id}
              onPress={() => {
                if (section.route) {
                  router.push(section.route as never);
                }
              }}
              activeOpacity={0.8}
            >
              <Card>
                <Text style={styles.itineraryTitle}>
                  {locale === 'de' ? section.titleDe : section.titleEn}
                </Text>
                <Text style={styles.itineraryDescription}>
                  {locale === 'de' ? section.summaryDe : section.summaryEn}
                </Text>
                <Text style={styles.itineraryMeta}>{section.items.slice(0, 3).join(' | ')}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.grid}>
          {exploreCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.gridItem,
                { width: layout.columns === 1 ? '100%' : layout.itemWidth },
              ]}
              onPress={() => router.push(category.route as never)}
              activeOpacity={0.8}
            >
              <Card variant="elevated" style={styles.categoryCard}>
                <Text style={styles.categoryTitle}>
                  {locale === 'de' ? category.titleDe : category.titleEn}
                </Text>
                <Text style={styles.categoryDescription}>
                  {locale === 'de'
                    ? category.descriptionDe
                    : category.descriptionEn}
                </Text>
                <Text style={styles.categoryLink}>Open</Text>
              </Card>
            </TouchableOpacity>
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
    padding: theme.spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
  },
  gridItem: {
    marginBottom: theme.spacing.sm,
  },
  categoryCard: {
    minHeight: 168,
    justifyContent: 'space-between',
  },
  categoryTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  categoryDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  categoryLink: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '700',
    marginTop: theme.spacing.lg,
  },
  signatureSection: {
    marginTop: theme.spacing.xl,
  },
  signatureTitle: {
    ...theme.typography.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  itineraryTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  itineraryDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
    marginBottom: theme.spacing.md,
  },
  itineraryMeta: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '700',
  },
});
