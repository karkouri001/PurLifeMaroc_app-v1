import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '../../src/store/AppContext';
import { useTranslation } from 'react-i18next';
import { theme } from '../../src/theme/theme';
import { Button, Card, Header, HeroBanner } from '../../src/components/Common';
import {
  activities,
  accommodations,
  destinations,
  restaurants,
} from '../../src/data/mockData';
import { Enquiry } from '../../src/types';
import {
  buildPreferenceSignals,
  getDurationLabel,
} from '../../src/utils/preferences';
import { validationUtils } from '../../src/utils/helpers';

export default function EnquiryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    contextDestination?: string;
    contextActivity?: string;
    contextAccommodation?: string;
    contextRestaurant?: string;
    routeId?: string;
    driverId?: string;
    fromFavorites?: string;
  }>();
  const { preferences, addEnquiry, favorites } = useAppContext();
  const { i18n, t } = useTranslation();
  const locale = i18n.language === 'de' ? 'de' : 'en';
  const preferenceSignals = buildPreferenceSignals(preferences, i18n.language, t);

  const favoriteContext = useMemo(() => {
    if (params.fromFavorites !== '1') {
      return null;
    }

    const names: string[] = [];
    const destinationIds: string[] = [];
    const destinationSet = new Set<string>();

    favorites.forEach((favorite) => {
      if (favorite.type === 'destination') {
        const destination = destinations.find((item) => item.id === favorite.itemId);
        if (destination) {
          names.push(destination.nameEn);
          if (!destinationSet.has(destination.id)) {
            destinationSet.add(destination.id);
            destinationIds.push(destination.id);
          }
        }
        return;
      }

      if (favorite.type === 'activity') {
        const activity = activities.find((item) => item.id === favorite.itemId);
        if (activity) {
          names.push(activity.nameEn);
          if (!destinationSet.has(activity.destination)) {
            destinationSet.add(activity.destination);
            destinationIds.push(activity.destination);
          }
        }
        return;
      }

      if (favorite.type === 'accommodation') {
        const accommodation = accommodations.find((item) => item.id === favorite.itemId);
        if (accommodation) {
          names.push(accommodation.nameEn);
          if (!destinationSet.has(accommodation.destination)) {
            destinationSet.add(accommodation.destination);
            destinationIds.push(accommodation.destination);
          }
        }
        return;
      }

      const restaurant = restaurants.find((item) => item.id === favorite.itemId);
      if (restaurant) {
        names.push(restaurant.nameEn);
        if (!destinationSet.has(restaurant.destination)) {
          destinationSet.add(restaurant.destination);
          destinationIds.push(restaurant.destination);
        }
      }
    });

    return {
      names,
      destinationIds,
    };
  }, [favorites, params.fromFavorites]);

  const prefilledMessage = useMemo(() => {
    if (favoriteContext && favoriteContext.names.length > 0) {
      return `I would like help planning around my saved shortlist: ${favoriteContext.names.join(', ')}.`;
    }

    if (params.contextRestaurant) {
      const restaurant = restaurants.find((item) => item.id === params.contextRestaurant);
      return restaurant
        ? `I would like guidance about dining at ${restaurant.nameEn}.`
        : '';
    }

    if (params.contextActivity) {
      const activity = activities.find((item) => item.id === params.contextActivity);
      return activity
        ? `I would like advice around ${activity.nameEn}.`
        : '';
    }

    if (params.contextAccommodation) {
      const accommodation = accommodations.find(
        (item) => item.id === params.contextAccommodation
      );
      return accommodation
        ? `I would like more guidance about ${accommodation.nameEn}.`
        : '';
    }

    if (params.contextDestination) {
      const destination = destinations.find((item) => item.id === params.contextDestination);
      return destination
        ? `I would like local recommendations for ${destination.nameEn}.`
        : '';
    }

    if (params.routeId) {
      return `I would like more guidance about this route idea.`;
    }

    if (params.driverId) {
      return `I would like advice about this chauffeur option.`;
    }

    return '';
  }, [
    params.contextAccommodation,
    params.contextActivity,
    params.contextDestination,
    params.contextRestaurant,
    params.driverId,
    params.routeId,
    favoriteContext,
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    duration: getDurationLabel(preferences?.duration ?? null, t) || '',
    specialRequests: prefilledMessage,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      nextErrors.name = t('screens.name-required');
    }

    if (!formData.email.trim() || !validationUtils.isValidEmail(formData.email.trim())) {
      nextErrors.email = t('screens.valid-email-required');
    }

    if (!formData.specialRequests.trim()) {
      nextErrors.specialRequests =
        locale === 'de'
          ? 'Bitte beschreiben Sie kurz, wobei Sie Hilfe brauchen.'
          : 'Please briefly describe what you need help with.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const getContextDestinations = (): string[] => {
    if (preferences?.preferredDestinations?.length) {
      return preferences.preferredDestinations;
    }

    if (favoriteContext?.destinationIds.length) {
      return favoriteContext.destinationIds;
    }

    if (params.contextDestination) {
      return [params.contextDestination];
    }

    if (params.contextActivity) {
      const activity = activities.find((item) => item.id === params.contextActivity);
      return activity ? [activity.destination] : [];
    }

    if (params.contextAccommodation) {
      const accommodation = accommodations.find(
        (item) => item.id === params.contextAccommodation
      );
      return accommodation ? [accommodation.destination] : [];
    }

    if (params.contextRestaurant) {
      const restaurant = restaurants.find((item) => item.id === params.contextRestaurant);
      return restaurant ? [restaurant.destination] : [];
    }

    return [];
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert(t('screens.validation-error'), t('screens.please-fill-all-fields'));
      return;
    }

    const enquiry: Enquiry = {
      id: `ENQ-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      travelStyle: preferences?.travelStyle || '',
      destinations: getContextDestinations(),
      startDate: formData.startDate,
      duration: formData.duration,
      specialRequests: formData.specialRequests,
      createdAt: Date.now(),
    };

    try {
      await addEnquiry(enquiry);
      router.push({
        pathname: '/(app)/enquiry-summary',
        params: { enquiryId: enquiry.id, autoOpenEmail: '1' },
      } as never);
    } catch {
      Alert.alert(t('screens.error'), t('screens.failed-to-submit-enquiry'));
    }
  };

  const renderInput = (
    label: string,
    field: keyof typeof formData,
    placeholder: string,
    multiline = false,
    helperText?: string
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline
            ? { minHeight: 120, textAlignVertical: 'top' }
            : undefined,
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        value={formData[field]}
        onChangeText={(value) => {
          setFormData((prev) => ({ ...prev, [field]: value }));
          if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
          }
        }}
        multiline={multiline}
      />
      {errors[field] ? <Text style={styles.errorText}>{errors[field]}</Text> : null}
      {!errors[field] && helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title={locale === 'de' ? 'Ask the concierge' : 'Ask the concierge'}
        subtitle={
          locale === 'de'
            ? 'Eine leichte E-Mail-Anfrage fuer Guidance'
            : 'A light email request for guidance'
        }
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <HeroBanner
          eyebrow="Human follow-up"
          title="Describe what you need"
          description={
            locale === 'de'
              ? 'Dieses Formular bleibt bewusst leicht. Es sammelt nur genug Kontext, damit ein Concierge per E-Mail sinnvoll antworten kann.'
              : 'This form intentionally stays light. It gathers just enough context for a concierge to answer helpfully by email.'
          }
        />

        {preferenceSignals.length > 0 ? (
          <Card>
            <Text style={styles.sectionTitle}>
              {locale === 'de' ? 'Using your saved profile' : 'Using your saved profile'}
            </Text>
            {preferenceSignals.slice(0, 4).map((signal) => (
              <View key={signal} style={styles.signalRow}>
                <View style={styles.signalDot} />
                <Text style={styles.signalText}>{signal}</Text>
              </View>
            ))}
          </Card>
        ) : null}

        <Card>
          <Text style={styles.sectionTitle}>
            {locale === 'de' ? 'What submit actually does' : 'What submit actually does'}
          </Text>
          <Text style={styles.signalText}>
            {locale === 'de'
              ? 'Beim Absenden speichert die App die Anfrage zuerst lokal und versucht danach, den echten E-Mail-Entwurf an inside@purlife-maroc.com zu oeffnen. Gesendet wird er nur, wenn Sie ihn in Ihrer Mail-App wirklich abschicken.'
              : 'When you submit, the app first stores the request locally and then tries to open the real email draft addressed to inside@purlife-maroc.com. It is only sent if you actually send it from your mail app.'}
          </Text>
          {favoriteContext?.names.length ? (
            <Text style={[styles.signalText, styles.topMargin]}>
              {locale === 'de'
                ? `Diese Anfrage verwendet auch Ihre gespeicherte Shortlist: ${favoriteContext.names.join(', ')}.`
                : `This request also uses your saved shortlist: ${favoriteContext.names.join(', ')}.`}
            </Text>
          ) : null}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Contact details</Text>
          {renderInput(t('screens.full-name'), 'name', t('screens.enter-full-name'))}
          {renderInput(
            t('screens.email'),
            'email',
            t('screens.enter-email'),
            false,
            locale === 'de'
              ? 'Wir nutzen Ihre E-Mail nur fuer den Entwurf und die echte Concierge-Antwort.'
              : 'We use your email only for the draft and the real concierge reply.'
          )}
          {renderInput(
            locale === 'de' ? 'Phone (optional)' : 'Phone (optional)',
            'phone',
            t('screens.enter-phone')
          )}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Travel context (optional)</Text>
          {renderInput(
            locale === 'de' ? 'Trip timing' : 'Trip timing',
            'startDate',
            locale === 'de' ? 'Flexible or approximate' : 'Flexible or approximate'
          )}
          {renderInput(
            locale === 'de' ? 'Duration idea' : 'Duration idea',
            'duration',
            locale === 'de' ? 'Example: 5 days' : 'Example: 5 days'
          )}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Your message</Text>
          {renderInput(
            locale === 'de' ? 'Message' : 'Message',
            'specialRequests',
            locale === 'de'
              ? 'Tell the concierge what you want to explore or understand.'
              : 'Tell the concierge what you want to explore or understand.',
            true
          )}
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={locale === 'de' ? 'Save and open email draft' : 'Save and open email draft'}
          onPress={handleSubmit}
        />
        <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>{t('common.cancel')}</Text>
        </TouchableOpacity>
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
  sectionTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  fieldContainer: {
    marginBottom: theme.spacing.lg,
  },
  fieldLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
  helperText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    lineHeight: 18,
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
  signalText: {
    flex: 1,
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  topMargin: {
    marginTop: theme.spacing.md,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    backgroundColor: theme.colors.surface,
  },
  cancelButton: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  cancelText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
});
