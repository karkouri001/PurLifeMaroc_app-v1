import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../src/store/AppContext';
import { useTopSpacing } from '../../src/components/AppChrome';
import { Button, Card } from '../../src/components/Common';
import { theme } from '../../src/theme/theme';
import { destinations, travelStyles } from '../../src/data/mockData';
import {
  Destination,
  UserPreferences,
} from '../../src/types';
import {
  buildPreferenceUsageNotes,
  getAccommodationLabel,
  getDurationLabel,
  getTravelStyleLabel,
} from '../../src/utils/preferences';

type Step = 1 | 2 | 3 | 4 | 5 | 6;
type Duration = 'weekend' | 'week' | 'twoweeks' | 'month';
type Accommodation = 'luxury' | 'boutique' | 'camp' | 'traditional';

export default function OnboardingScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { setPreferences } = useAppContext();
  const [step, setStep] = useState<Step>(1);
  const topSpacing = useTopSpacing(theme.spacing.lg);

  const [prefs, setPrefs] = useState<UserPreferences>({
    travelStyle: null,
    duration: null,
    interests: [],
    preferredDestinations: [],
    accommodationPreference: null,
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((current) => (current + 1) as Step);
      return;
    }

    void handleComplete();
  };

  const handleSkip = () => {
    router.replace('/(app)/(tabs)');
  };

  const handleComplete = async () => {
    await setPreferences(prefs);
    router.replace('/(app)/(tabs)');
  };

  return (
      <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topSpacing }]}>
        <Text style={styles.progress}>{`${step}/${totalSteps}`}</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(step / totalSteps) * 100}%` },
            ]}
          />
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {step === 1 && (
          <TravelStyleStep
            language={i18n.language}
            selected={prefs.travelStyle}
            onSelect={(travelStyle) => setPrefs({ ...prefs, travelStyle })}
          />
        )}
        {step === 2 && (
          <DurationStep
            selected={prefs.duration}
            onSelect={(duration) => setPrefs({ ...prefs, duration })}
          />
        )}
        {step === 3 && (
          <InterestsStep
            selected={prefs.interests}
            onSelect={(interests) => setPrefs({ ...prefs, interests })}
          />
        )}
        {step === 4 && (
          <PreferredDestinationsStep
            destinationsList={destinations}
            language={i18n.language}
            selected={prefs.preferredDestinations}
            onSelect={(preferredDestinations) =>
              setPrefs({ ...prefs, preferredDestinations })
            }
          />
        )}
        {step === 5 && (
          <AccommodationStep
            selected={prefs.accommodationPreference}
            onSelect={(accommodationPreference) =>
              setPrefs({ ...prefs, accommodationPreference })
            }
          />
        )}
        {step === 6 && <SummaryStep preferences={prefs} />}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={t('common.skip')}
          onPress={handleSkip}
          variant="outline"
          style={{ flex: 1, marginRight: theme.spacing.md }}
        />
        <Button
          title={step === totalSteps ? t('common.done') : t('common.next')}
          onPress={handleNext}
          variant="primary"
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

function TravelStyleStep({
  language,
  selected,
  onSelect,
}: {
  language: string;
  selected: string | null;
  onSelect: (travelStyle: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <View>
      <Text style={styles.stepTitle}>{t('onboarding.step1')}</Text>
      <Text style={styles.stepSubtitle}>{t('onboarding.title')}</Text>

      {travelStyles.map((style) => (
        <TouchableOpacity
          key={style.id}
          onPress={() => onSelect(style.id)}
          activeOpacity={0.7}
        >
          <Card
            style={[
              styles.optionCard,
              selected === style.id && styles.selectedCard,
            ]}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionIcon}>{style.icon}</Text>
              <View style={styles.optionTextWrap}>
                <Text style={styles.optionTitle}>
                  {language === 'de' ? style.nameDe : style.nameEn}
                </Text>
                <Text style={styles.optionDescription}>
                  {language === 'de' ? style.descriptionDe : style.descriptionEn}
                </Text>
              </View>
              {selected === style.id && <Text style={styles.checkmark}>OK</Text>}
            </View>
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function DurationStep({
  selected,
  onSelect,
}: {
  selected: Duration | null;
  onSelect: (duration: Duration) => void;
}) {
  const { t } = useTranslation();

  const options: { id: Duration; label: string }[] = [
    { id: 'weekend', label: t('onboarding.duration.weekend') },
    { id: 'week', label: t('onboarding.duration.week') },
    { id: 'twoweeks', label: t('onboarding.duration.twoweeks') },
    { id: 'month', label: t('onboarding.duration.month') },
  ];

  return (
    <View>
      <Text style={styles.stepTitle}>{t('onboarding.step3')}</Text>

      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          onPress={() => onSelect(option.id)}
          activeOpacity={0.7}
        >
          <Card
            style={[
              styles.optionCard,
              selected === option.id && styles.selectedCard,
            ]}
          >
            <Text style={styles.optionTitle}>{option.label}</Text>
            {selected === option.id && <Text style={styles.checkmark}>OK</Text>}
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function InterestsStep({
  selected,
  onSelect,
}: {
  selected: string[];
  onSelect: (interests: string[]) => void;
}) {
  const { t } = useTranslation();

  const interests = [
    { id: 'culture', label: t('onboarding.interests.culture') },
    { id: 'adventure', label: t('onboarding.interests.adventure') },
    { id: 'gastronomy', label: t('onboarding.interests.gastronomy') },
    { id: 'beach', label: t('onboarding.interests.beach') },
    { id: 'shopping', label: t('onboarding.interests.shopping') },
    { id: 'history', label: t('onboarding.interests.history') },
  ];

  const toggleInterest = (interestId: string) => {
    if (selected.includes(interestId)) {
      onSelect(selected.filter((item) => item !== interestId));
      return;
    }

    onSelect([...selected, interestId]);
  };

  return (
    <View>
      <Text style={styles.stepTitle}>{t('onboarding.step4')}</Text>
      <Text style={styles.stepSubtitle}>{t('onboarding.step4Subtitle')}</Text>

      <View style={styles.interestGrid}>
        {interests.map((interest) => (
          <TouchableOpacity
            key={interest.id}
            onPress={() => toggleInterest(interest.id)}
            style={[
              styles.interestBadge,
              selected.includes(interest.id) && styles.selectedInterestBadge,
            ]}
          >
            <Text style={styles.interestText}>{interest.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function PreferredDestinationsStep({
  destinationsList,
  language,
  selected,
  onSelect,
}: {
  destinationsList: Destination[];
  language: string;
  selected: string[];
  onSelect: (preferredDestinations: string[]) => void;
}) {
  const { t } = useTranslation();

  const toggleDestination = (destinationId: string) => {
    if (selected.includes(destinationId)) {
      onSelect(selected.filter((item) => item !== destinationId));
      return;
    }

    onSelect([...selected, destinationId]);
  };

  return (
    <View>
      <Text style={styles.stepTitle}>{t('onboarding.step5')}</Text>
      <Text style={styles.stepSubtitle}>{t('onboarding.step5Subtitle')}</Text>

      {destinationsList.map((destination) => (
        <TouchableOpacity
          key={destination.id}
          onPress={() => toggleDestination(destination.id)}
          activeOpacity={0.7}
        >
          <Card
            style={[
              styles.optionCard,
              selected.includes(destination.id) && styles.selectedCard,
            ]}
          >
            <Text style={styles.optionTitle}>
              {language === 'de' ? destination.nameDe : destination.nameEn}
            </Text>
            {selected.includes(destination.id) && (
              <Text style={styles.checkmark}>OK</Text>
            )}
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function AccommodationStep({
  selected,
  onSelect,
}: {
  selected: Accommodation | null;
  onSelect: (accommodation: Accommodation) => void;
}) {
  const { t } = useTranslation();

  const options: { id: Accommodation; label: string }[] = [
    { id: 'luxury', label: t('onboarding.accommodation.luxury') },
    { id: 'boutique', label: t('onboarding.accommodation.boutique') },
    { id: 'camp', label: t('onboarding.accommodation.camp') },
    { id: 'traditional', label: t('onboarding.accommodation.traditional') },
  ];

  return (
    <View>
      <Text style={styles.stepTitle}>{t('onboarding.step6')}</Text>

      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          onPress={() => onSelect(option.id)}
          activeOpacity={0.7}
        >
          <Card
            style={[
              styles.optionCard,
              selected === option.id && styles.selectedCard,
            ]}
          >
            <Text style={styles.optionTitle}>{option.label}</Text>
            {selected === option.id && <Text style={styles.checkmark}>OK</Text>}
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function SummaryStep({ preferences }: { preferences: UserPreferences }) {
  const { t, i18n } = useTranslation();

  const summaryItems = useMemo(() => {
    const items: string[] = [];
    const selectedTravelStyle = getTravelStyleLabel(
      preferences.travelStyle,
      i18n.language
    );

    const selectedDestinations = preferences.preferredDestinations
      .map((destinationId) =>
        destinations.find((destination) => destination.id === destinationId)
      )
      .filter((destination): destination is Destination => Boolean(destination))
      .map((destination) =>
        i18n.language === 'de'
          ? destination.nameDe
          : destination.nameEn
      );

    const durationLabel = getDurationLabel(preferences.duration, t);
    const accommodationLabel = getAccommodationLabel(
      preferences.accommodationPreference,
      t
    );

    if (selectedTravelStyle) {
      items.push(`${t('screens.travel-style')}: ${selectedTravelStyle}`);
    }
    if (durationLabel) {
      items.push(`${t('screens.duration')}: ${durationLabel}`);
    }
    if (preferences.interests.length > 0) {
      items.push(
        `${t('onboarding.step4')}: ${preferences.interests
          .map((interest) => t(`onboarding.interests.${interest}`))
          .join(', ')}`
      );
    }
    if (selectedDestinations.length > 0) {
      items.push(`${t('screens.destinations')}: ${selectedDestinations.join(', ')}`);
    }
    if (accommodationLabel) {
      items.push(`${t('navigation.accommodation')}: ${accommodationLabel}`);
    }

    return items;
  }, [i18n.language, preferences, t]);

  const usageNotes = useMemo(
    () => buildPreferenceUsageNotes(i18n.language),
    [i18n.language]
  );

  return (
    <View>
      <Text style={styles.stepTitle}>{t('onboarding.step7')}</Text>
      <Text style={styles.stepSubtitle}>{t('onboarding.readyDescription')}</Text>

      <Card style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>{t('onboarding.yourProfile')}</Text>
        {summaryItems.map((item) => (
          <Text key={item} style={styles.summaryItem}>
            {`- ${item}`}
          </Text>
        ))}
      </Card>

      <Card>
        <Text style={styles.summaryLabel}>
          {i18n.language === 'de' ? 'Warum wir das fragen' : 'Why we ask this'}
        </Text>
        {usageNotes.map((item) => (
          <View key={item} style={styles.usageRow}>
            <View style={styles.usageDot} />
            <Text style={styles.summaryItem}>{item}</Text>
          </View>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
  },
  progress: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    fontWeight: '600',
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  contentInner: {
    paddingBottom: theme.spacing.xxxl,
  },
  stepTitle: {
    ...theme.typography.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    fontWeight: 'bold',
  },
  stepSubtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  optionCard: {
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCard: {
    backgroundColor: theme.colors.beige,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  optionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTextWrap: {
    flex: 1,
  },
  optionIcon: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  optionTitle: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  optionDescription: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  checkmark: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginLeft: theme.spacing.md,
    fontWeight: '700',
  },
  interestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestBadge: {
    width: '48%',
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
  },
  selectedInterestBadge: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  interestText: {
    ...theme.typography.body,
    textAlign: 'center',
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  summaryCard: {
    marginTop: theme.spacing.xl,
  },
  summaryLabel: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    fontWeight: 'bold',
  },
  summaryItem: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  usageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  usageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.md,
    marginTop: 7,
  },
  footer: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    backgroundColor: theme.colors.white,
    gap: theme.spacing.md,
  },
});
