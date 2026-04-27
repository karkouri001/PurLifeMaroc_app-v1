import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Card, Header, HeroBanner } from '../../src/components/Common';
import { theme } from '../../src/theme/theme';
import { useAppContext } from '../../src/store/AppContext';
import { BudgetEstimator } from '../../src/services/BudgetEstimator';
import { getPreferredTripLength } from '../../src/utils/content';

type DiningPace = 'light' | 'balanced' | 'signature';

export default function BudgetEstimatorScreen() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { preferences, tripPlan } = useAppContext();
  const [travelers, setTravelers] = useState(2);
  const [nights, setNights] = useState(
    getPreferredTripLength(preferences?.duration ?? null)
  );
  const [includeChauffeur, setIncludeChauffeur] = useState(true);
  const [diningPace, setDiningPace] = useState<DiningPace>('balanced');

  const locale = i18n.language === 'de' ? 'de' : 'en';

  const estimate = useMemo(() => {
    return BudgetEstimator.estimate({
      travelers,
      nights,
      includeChauffeur,
      diningPace,
      tripPlan,
      preferences,
    });
  }, [diningPace, includeChauffeur, nights, preferences, travelers, tripPlan]);

  return (
    <View style={styles.container}>
      <Header
        title={locale === 'de' ? 'Budget estimator' : 'Budget estimator'}
        subtitle={
          locale === 'de'
            ? 'Estimate the trip before sending an enquiry'
            : 'Estimate the trip before sending an enquiry'
        }
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <HeroBanner
          eyebrow={locale === 'de' ? 'Budget view' : 'Budget view'}
          title={locale === 'de' ? 'See the trip range early' : 'See the trip range early'}
          description={
            locale === 'de'
              ? 'The estimate uses your current trip plan when possible and falls back to your travel profile when the plan is still light.'
              : 'The estimate uses your current trip plan when possible and falls back to your travel profile when the plan is still light.'
          }
          chips={[
            `${estimate.travelers} ${locale === 'de' ? 'travelers' : 'travelers'}`,
            `${estimate.nights} ${locale === 'de' ? 'nights' : 'nights'}`,
          ]}
        />

        <Card>
          <Text style={styles.sectionTitle}>{locale === 'de' ? 'Inputs' : 'Inputs'}</Text>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>{locale === 'de' ? 'Travelers' : 'Travelers'}</Text>
            <View style={styles.counterWrap}>
              <TouchableOpacity
                onPress={() => setTravelers((current) => Math.max(1, current - 1))}
                style={styles.counterButton}
              >
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{travelers}</Text>
              <TouchableOpacity
                onPress={() => setTravelers((current) => Math.min(8, current + 1))}
                style={styles.counterButton}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>{locale === 'de' ? 'Nights' : 'Nights'}</Text>
            <View style={styles.counterWrap}>
              <TouchableOpacity
                onPress={() => setNights((current) => Math.max(1, current - 1))}
                style={styles.counterButton}
              >
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{nights}</Text>
              <TouchableOpacity
                onPress={() => setNights((current) => Math.min(21, current + 1))}
                style={styles.counterButton}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>
                {locale === 'de' ? 'Private chauffeur' : 'Private chauffeur'}
              </Text>
              <Text style={styles.inputHint}>
                {locale === 'de'
                  ? 'Include dedicated transfers in the estimate'
                  : 'Include dedicated transfers in the estimate'}
              </Text>
            </View>
            <Switch
              value={includeChauffeur}
              onValueChange={setIncludeChauffeur}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primaryLight,
              }}
              thumbColor={theme.colors.white}
            />
          </View>

          <Text style={[styles.inputLabel, styles.paceLabel]}>
            {locale === 'de' ? 'Dining pace' : 'Dining pace'}
          </Text>
          <View style={styles.paceRow}>
            {[
              { id: 'light', labelEn: 'Light', labelDe: 'Light' },
              { id: 'balanced', labelEn: 'Balanced', labelDe: 'Balanced' },
              { id: 'signature', labelEn: 'Signature', labelDe: 'Signature' },
            ].map((entry) => {
              const active = diningPace === entry.id;

              return (
                <TouchableOpacity
                  key={entry.id}
                  onPress={() => setDiningPace(entry.id as DiningPace)}
                  style={[styles.paceChip, active ? styles.paceChipActive : undefined]}
                >
                  <Text
                    style={[
                      styles.paceChipText,
                      active ? styles.paceChipTextActive : undefined,
                    ]}
                  >
                    {locale === 'de' ? entry.labelDe : entry.labelEn}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        <Card variant="elevated">
          <Text style={styles.sectionTitle}>{locale === 'de' ? 'Estimated total' : 'Estimated total'}</Text>
          <Text style={styles.totalRange}>
            {`EUR ${estimate.totalMinimum.toLocaleString()} - EUR ${estimate.totalMaximum.toLocaleString()}`}
          </Text>
          <Text style={styles.totalHint}>
            {locale === 'de'
              ? 'This is a planning range, not a live quote.'
              : 'This is a planning range, not a live quote.'}
          </Text>
        </Card>

        {estimate.lines.map((line) => (
          <Card key={line.id}>
            <Text style={styles.lineLabel}>{line.label}</Text>
            <Text style={styles.lineRange}>
              {`EUR ${line.minimum.toLocaleString()} - EUR ${line.maximum.toLocaleString()}`}
            </Text>
            {line.note ? <Text style={styles.lineNote}>{line.note}</Text> : null}
          </Card>
        ))}

        <View style={styles.footerActions}>
          <Button
            title={locale === 'de' ? 'Refine trip plan' : 'Refine trip plan'}
            onPress={() => router.push('/(app)/trip-planner' as never)}
          />
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
  sectionTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  inputHint: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  counterWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: {
    ...theme.typography.h5,
    color: theme.colors.primaryDark,
  },
  counterValue: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    minWidth: 34,
    textAlign: 'center',
    marginHorizontal: theme.spacing.sm,
  },
  paceLabel: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  paceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  paceChip: {
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  paceChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  paceChipText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: '700',
  },
  paceChipTextActive: {
    color: theme.colors.white,
  },
  totalRange: {
    ...theme.typography.h3,
    color: theme.colors.primaryDark,
    marginBottom: theme.spacing.sm,
  },
  totalHint: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  lineLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  lineRange: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  lineNote: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  footerActions: {
    marginTop: theme.spacing.lg,
  },
});
