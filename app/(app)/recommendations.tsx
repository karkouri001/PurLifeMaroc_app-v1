import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../src/store/AppContext';
import { useTranslation } from 'react-i18next';
import { theme } from '../../src/theme/theme';
import { Button, Card, Header, HeroBanner } from '../../src/components/Common';
import { RecommendationEngine } from '../../src/services/RecommendationEngine';
import {
  destinations,
  activities,
  accommodations,
} from '../../src/data/mockData';
import { RecommendationResult } from '../../src/types';
import { buildPreferenceSignals } from '../../src/utils/preferences';

export default function RecommendationsScreen() {
  const router = useRouter();
  const { preferences } = useAppContext();
  const { i18n, t } = useTranslation();
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const locale = i18n.language === 'de' ? 'de' : 'en';
  const preferenceSignals = buildPreferenceSignals(preferences, i18n.language, t);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (preferences) {
        setRecommendations(
          RecommendationEngine.generateRecommendations(
            preferences,
            destinations,
            activities,
            accommodations
          )
        );
      }
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [preferences]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title={t('screens.recommendations')} onBackPress={() => router.back()} />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>{t('screens.generating-recommendations')}</Text>
        </View>
      </View>
    );
  }

  if (!recommendations) {
    return (
      <View style={styles.container}>
        <Header title={t('screens.recommendations')} onBackPress={() => router.back()} />
        <View style={styles.loaderContainer}>
          <Text style={styles.loadingText}>{t('screens.error-loading')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={t('screens.recommendations')}
        subtitle={t('screens.personalized-for-you')}
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <HeroBanner
          eyebrow="Rule-based match"
          title={
            locale === 'de'
              ? 'Curated guidance for your profile'
              : 'Curated guidance for your profile'
          }
          description={recommendations.explanation}
          chips={[
            `${recommendations.destinations.length} places`,
            `${recommendations.activities.length} activities`,
            `${recommendations.accommodation.length} stays`,
          ]}
        />

        {preferenceSignals.length > 0 ? (
          <Card>
            <Text style={styles.noteTitle}>
              {locale === 'de' ? 'How your preferences were used' : 'How your preferences were used'}
            </Text>
            {preferenceSignals.map((signal) => (
              <View key={signal} style={styles.signalRow}>
                <View style={styles.signalDot} />
                <Text style={styles.noteText}>{signal}</Text>
              </View>
            ))}
          </Card>
        ) : null}

        <RecommendationSection
          title={t('screens.recommended-destinations')}
          items={recommendations.destinations.map((destination) => ({
            id: destination.id,
            title: locale === 'de' ? destination.nameDe : destination.nameEn,
            subtitle: destination.bestSeason,
            onPress: () =>
              router.push({
                pathname: '/(app)/destination-details',
                params: { id: destination.id },
              } as never),
          }))}
        />

        <RecommendationSection
          title={t('screens.suggested-activities')}
          items={recommendations.activities.map((activity) => ({
            id: activity.id,
            title: locale === 'de' ? activity.nameDe : activity.nameEn,
            subtitle: `${activity.duration} | ${activity.category}`,
            onPress: () =>
              router.push({
                pathname: '/(app)/activity-details',
                params: { id: activity.id },
              } as never),
          }))}
        />

        <RecommendationSection
          title={t('recommendations.accommodation')}
          items={recommendations.accommodation.map((stay) => ({
            id: stay.id,
            title: locale === 'de' ? stay.nameDe : stay.nameEn,
            subtitle: stay.pricePerNight,
            onPress: () =>
              router.push({
                pathname: '/(app)/accommodation-details',
                params: { id: stay.id },
              } as never),
          }))}
        />

        <Card>
          <Text style={styles.noteTitle}>
            {locale === 'de' ? 'What happens next' : 'What happens next'}
          </Text>
          <Text style={styles.noteText}>
            {locale === 'de'
              ? 'Der Nutzer kann diese Vorschlaege weiter erkunden oder eine einfache Guidance-Anfrage an den Concierge senden.'
              : 'The traveler can keep exploring these suggestions or send a simple guidance request to the concierge.'}
          </Text>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={locale === 'de' ? 'Refine with concierge' : 'Refine with concierge'}
          onPress={() => router.push('/(app)/enquiry' as never)}
        />
      </View>
    </View>
  );
}

function RecommendationSection({
  title,
  items,
}: {
  title: string;
  items: { id: string; title: string; subtitle: string; onPress: () => void }[];
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity key={item.id} onPress={item.onPress} activeOpacity={0.8}>
          <Card>
            <View style={styles.itemRow}>
              <Text style={styles.itemIndex}>{`${index + 1}`.padStart(2, '0')}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      ))}
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.lg,
    textAlign: 'center',
  },
  section: {
    marginTop: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIndex: {
    ...theme.typography.overline,
    color: theme.colors.primary,
    marginRight: theme.spacing.md,
    minWidth: 26,
  },
  itemTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
  },
  itemSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  noteTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  noteText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  signalRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  signalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.md,
    marginTop: 7,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    backgroundColor: theme.colors.surface,
  },
});
