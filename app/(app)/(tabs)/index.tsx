import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../../src/store/AppContext';
import {
  Button,
  Card,
  HeroBanner,
  SectionHeader,
  StatChip,
} from '../../../src/components/Common';
import { useTopSpacing } from '../../../src/components/AppChrome';
import { destinations } from '../../../src/data/mockData';
import {
  privateChauffeurs,
  signatureItineraries,
} from '../../../src/data/conciergeData';
import { servicePillars, websiteSections } from '../../../src/data/websiteStructure';
import { brandAssets } from '../../../src/data/imageAssets';
import { insightsUtils } from '../../../src/utils/helpers';
import { theme } from '../../../src/theme/theme';
import { useResponsiveLayout } from '../../../src/theme/responsive';

const quickActions = [
  {
    id: 'search',
    labelEn: 'Search',
    labelDe: 'Search',
    route: '/(app)/search',
  },
  {
    id: 'destinations',
    labelEn: 'Destinations',
    labelDe: 'Ziele',
    route: '/(app)/destinations-list',
  },
  {
    id: 'activities',
    labelEn: 'Activities',
    labelDe: 'Aktivitaeten',
    route: '/(app)/activities-list',
  },
  {
    id: 'stays',
    labelEn: 'Stays',
    labelDe: 'Unterkuenfte',
    route: '/(app)/accommodation-list',
  },
  {
    id: 'dining',
    labelEn: 'Eat & Drink',
    labelDe: 'Eat & Drink',
    route: '/(app)/eat-drink',
  },
  {
    id: 'contact',
    labelEn: 'Contact',
    labelDe: 'Kontakt',
    route: '/(app)/enquiry',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { favorites } = useAppContext();
  const insights = insightsUtils.generateMockInsights();
  const headerTopPadding = useTopSpacing(theme.spacing.lg);
  const layout = useResponsiveLayout({
    horizontalPadding: theme.spacing.lg,
    gap: theme.spacing.md,
    minTwoColumnWidth: 148,
  });

  const locale = i18n.language === 'de' ? 'de' : 'en';
  const topDestinations = destinations.slice(0, 3);
  const featuredDrivers = privateChauffeurs.slice(0, 2);
  const compact = layout.columns === 1;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { paddingTop: headerTopPadding }]}>
        <View style={styles.headerBrand}>
          <Image source={brandAssets.logo} style={styles.logo} resizeMode="contain" />
          <View style={styles.headerTextWrap}>
            <Text style={styles.kicker}>Inside Morocco</Text>
            <Text style={styles.headerTitle}>Pur Life Maroc</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push('/(app)/settings' as never)}>
          <Text style={styles.headerAction}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.heroWrap}>
        <HeroBanner
          eyebrow="Private concierge guide"
          title={
            locale === 'de'
              ? 'Kuratiertes Marokko mit mehr Kontext'
              : 'Curated Morocco with more context'
          }
          description={
            locale === 'de'
              ? 'Die App spiegelt die neue Website-Struktur: Erlebnisse, Pur Life Living, Marokko, Destinationen und Kontakt.'
              : 'The app mirrors the new website structure: experiences, Pur Life Living, Morocco, destinations, and contact.'
          }
          accent="Warm, local, curated"
          imageSource={brandAssets.heroBanner}
          logoSource={brandAssets.logo}
          chips={[
            insights.topDestination.name,
            'Private Concierge',
            'Pur Life Living',
          ]}
        />
      </View>

      <View style={styles.metricsRow}>
        <StatChip label="Saved items" value={favorites.length.toString()} />
        <View style={styles.metricSpacer} />
        <StatChip label="Website areas" value={websiteSections.length.toString()} />
      </View>

      <SectionHeader
        title="Quick guidance"
        subtitle="Direct access to the most useful content"
      />
      <View style={styles.quickGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            onPress={() => router.push(action.route as never)}
            style={[
              styles.quickCard,
              { width: compact ? '100%' : layout.itemWidth },
            ]}
            activeOpacity={0.8}
          >
            <Text style={styles.quickLabel}>
              {locale === 'de' ? action.labelDe : action.labelEn}
            </Text>
            <Text style={styles.quickHint}>Open</Text>
          </TouchableOpacity>
        ))}
      </View>

      <SectionHeader
        title="PLM service pillars"
        subtitle="From the relaunch navigation and brand notes"
      />
      <View style={styles.sectionContent}>
        {servicePillars.map((pillar) => (
          <Card key={pillar.id}>
            <Text style={styles.itineraryTitle}>
              {locale === 'de' ? pillar.titleDe : pillar.titleEn}
            </Text>
            <Text style={styles.itinerarySummary}>
              {locale === 'de' ? pillar.textDe : pillar.textEn}
            </Text>
          </Card>
        ))}
      </View>

      <SectionHeader
        title="Most explored now"
        subtitle="Destinations kept in the website relaunch set"
        onViewAll={() => router.push('/(app)/insights' as never)}
      />
      <View style={styles.sectionContent}>
        {topDestinations.map((destination, index) => (
          <Card
            key={destination.id}
            variant="elevated"
            onPress={() =>
              router.push({
                pathname: '/(app)/destination-details',
                params: { id: destination.id },
              } as never)
            }
          >
            <View style={styles.destinationRow}>
              <View style={styles.destinationMarker} />
              <View style={{ flex: 1 }}>
                <Text style={styles.destinationName}>
                  {locale === 'de' ? destination.nameDe : destination.nameEn}
                </Text>
                <Text style={styles.destinationMeta}>{destination.bestSeason}</Text>
              </View>
              <Text style={styles.destinationRank}>{`${index + 1}`.padStart(2, '0')}</Text>
            </View>
            <Text style={styles.destinationDescription}>
              {locale === 'de'
                ? destination.descriptionDe
                : destination.descriptionEn}
            </Text>
          </Card>
        ))}
      </View>

      <SectionHeader
        title="Signature route ideas"
        subtitle="Information-only route inspiration for concierge follow-up"
      />
      <View style={styles.sectionContent}>
        {signatureItineraries.map((itinerary) => (
          <TouchableOpacity
            key={itinerary.id}
            onPress={() =>
              router.push({
                pathname: '/(app)/itinerary-details',
                params: { id: itinerary.id },
              } as never)
            }
            activeOpacity={0.8}
          >
            <Card>
              <Text style={styles.itineraryTitle}>
                {locale === 'de' ? itinerary.nameDe : itinerary.nameEn}
              </Text>
              <Text style={styles.itinerarySummary}>
                {locale === 'de' ? itinerary.summaryDe : itinerary.summaryEn}
              </Text>
              <Text style={styles.itineraryMeta}>{`${itinerary.duration} | ${locale === 'de' ? itinerary.themeDe : itinerary.themeEn}`}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <SectionHeader
        title="Private chauffeurs"
        subtitle="Profiles inspired by the real service direction"
      />
      <View style={styles.sectionContent}>
        {featuredDrivers.map((driver) => (
          <TouchableOpacity
            key={driver.id}
            onPress={() =>
              router.push({
                pathname: '/(app)/chauffeur-details',
                params: { id: driver.id },
              } as never)
            }
            activeOpacity={0.8}
          >
            <Card>
              <Text style={styles.driverName}>{driver.name}</Text>
              <Text style={styles.driverMeta}>{`${driver.baseCity} | ${driver.vehicleEn}`}</Text>
              <Text style={styles.driverSummary}>
                {locale === 'de' ? driver.summaryDe : driver.summaryEn}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.ctaSection}>
        <Button
          title={locale === 'de' ? 'Chat with concierge' : 'Chat with concierge'}
          onPress={() => router.push('/(app)/chatbot' as never)}
        />
        <Button
          title={locale === 'de' ? 'Ask by email' : 'Ask by email'}
          onPress={() => router.push('/(app)/enquiry' as never)}
          variant="secondary"
          style={styles.secondaryCta}
        />
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  logo: {
    width: 64,
    height: 64,
    marginRight: theme.spacing.sm,
  },
  headerTextWrap: {
    flex: 1,
  },
  kicker: {
    ...theme.typography.overline,
    color: theme.colors.primary,
    marginBottom: 1,
  },
  headerTitle: {
    ...theme.typography.h4,
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.display,
  },
  headerAction: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  heroWrap: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  metricsRow: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  metricSpacer: {
    width: theme.spacing.md,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  quickCard: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    minHeight: 112,
    justifyContent: 'space-between',
  },
  quickLabel: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
  },
  quickHint: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  sectionContent: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  destinationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  destinationMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.md,
  },
  destinationName: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
  },
  destinationMeta: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  destinationRank: {
    ...theme.typography.overline,
    color: theme.colors.primaryDark,
  },
  destinationDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  itineraryTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  itinerarySummary: {
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
  driverName: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  driverMeta: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  driverSummary: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  ctaSection: {
    paddingHorizontal: theme.spacing.lg,
  },
  secondaryCta: {
    marginTop: theme.spacing.md,
  },
  bottomPadding: {
    height: theme.spacing.xxxl,
  },
});
