import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Card, Header, HeroBanner } from '../../src/components/Common';
import { brandAssets } from '../../src/data/imageAssets';
import {
  authenticatePreStay,
  PRESTAY_SESSION_STORAGE_KEY,
} from '../../src/services/PreStayApi';
import { useAppContext } from '../../src/store/AppContext';
import { theme } from '../../src/theme/theme';
import { PreStayLanguage } from '../../src/types';
import { validationUtils } from '../../src/utils/helpers';

const copy = {
  en: {
    headerTitle: 'Pre-stay access',
    headerSubtitle: 'Client stay companion',
    eyebrow: 'Pur Life Maroc guests',
    heroTitle: 'Prepare your Morocco stay',
    heroDescription:
      'Open the compact client space for arrival notes, services, documents, concierge follow-up, and stay context.',
    heroAccent: 'Connected to reservation data when Ezus credentials are configured.',
    formTitle: 'Sign in with your reservation',
    email: 'Email address',
    emailPlaceholder: 'name@example.com',
    reference: 'Reservation reference',
    referencePlaceholder: 'Example: PLM-2026-001',
    lastName: 'Last name',
    lastNamePlaceholder: 'Optional, used when available',
    language: 'Language',
    submit: 'Open pre-stay app',
    loading: 'Checking reservation...',
    required: 'Email and reservation reference are required.',
    invalidEmail: 'Please enter a valid email address.',
    failed: 'The reservation could not be opened. Please check the reference.',
    privacyTitle: 'Client privacy',
    privacyText:
      'The mobile app only sends the reference and identity check to the backend. Ezus keys remain server-side.',
  },
  de: {
    headerTitle: 'Pre-Stay Zugang',
    headerSubtitle: 'Begleiter vor der Reise',
    eyebrow: 'Pur Life Maroc Gaeste',
    heroTitle: 'Bereiten Sie Ihren Marokko-Aufenthalt vor',
    heroDescription:
      'Oeffnen Sie den kompakten Client-Bereich fuer Ankunftsnotizen, Services, Dokumente, Concierge-Follow-up und Aufenthaltskontext.',
    heroAccent:
      'Mit Reservierungsdaten verbunden, sobald Ezus-Zugangsdaten konfiguriert sind.',
    formTitle: 'Mit Ihrer Reservierung anmelden',
    email: 'E-Mail-Adresse',
    emailPlaceholder: 'name@example.com',
    reference: 'Reservierungsreferenz',
    referencePlaceholder: 'Beispiel: PLM-2026-001',
    lastName: 'Nachname',
    lastNamePlaceholder: 'Optional, falls verfuegbar',
    language: 'Sprache',
    submit: 'Pre-Stay App oeffnen',
    loading: 'Reservierung wird geprueft...',
    required: 'E-Mail und Reservierungsreferenz sind erforderlich.',
    invalidEmail: 'Bitte geben Sie eine gueltige E-Mail-Adresse ein.',
    failed:
      'Die Reservierung konnte nicht geoeffnet werden. Bitte pruefen Sie die Referenz.',
    privacyTitle: 'Client-Datenschutz',
    privacyText:
      'Die mobile App sendet nur Referenz und Identitaetspruefung an das Backend. Ezus-Schluessel bleiben serverseitig.',
  },
};

export default function PrestayLoginScreen() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { language, setLanguage } = useAppContext();
  const locale: PreStayLanguage = language === 'de' || i18n.language === 'de' ? 'de' : 'en';
  const text = copy[locale];
  const [email, setEmail] = useState('');
  const [reservationReference, setReservationReference] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = async (nextLanguage: PreStayLanguage) => {
    await setLanguage(nextLanguage);
    await i18n.changeLanguage(nextLanguage);
  };

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();
    const trimmedReference = reservationReference.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedEmail || !trimmedReference) {
      setError(text.required);
      return;
    }

    if (!validationUtils.isValidEmail(trimmedEmail)) {
      setError(text.invalidEmail);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const session = await authenticatePreStay({
        email: trimmedEmail,
        reservationReference: trimmedReference,
        lastName: trimmedLastName || undefined,
        language: locale,
      });

      await AsyncStorage.setItem(
        PRESTAY_SESSION_STORAGE_KEY,
        JSON.stringify(session)
      );
      router.replace('/(app)/prestay-home' as never);
    } catch {
      setError(text.failed);
      Alert.alert(locale === 'de' ? 'Fehler' : 'Error', text.failed);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLanguageButton = (value: PreStayLanguage, label: string) => {
    const isActive = locale === value;

    return (
      <TouchableOpacity
        style={[styles.languageButton, isActive ? styles.languageButtonActive : null]}
        onPress={() => void handleLanguageChange(value)}
      >
        <Text
          style={[
            styles.languageButtonText,
            isActive ? styles.languageButtonTextActive : null,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header
        title={text.headerTitle}
        subtitle={text.headerSubtitle}
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <HeroBanner
          eyebrow={text.eyebrow}
          title={text.heroTitle}
          description={text.heroDescription}
          accent={text.heroAccent}
          imageSource={brandAssets.heroBanner}
          logoSource={brandAssets.logo}
        />

        <Card style={styles.formCard}>
          <Text style={styles.cardTitle}>{text.formTitle}</Text>

          <View style={styles.field}>
            <Text style={styles.label}>{text.email}</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder={text.emailPlaceholder}
              placeholderTextColor={theme.colors.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{text.reference}</Text>
            <TextInput
              style={styles.input}
              value={reservationReference}
              onChangeText={setReservationReference}
              placeholder={text.referencePlaceholder}
              placeholderTextColor={theme.colors.textMuted}
              autoCapitalize="characters"
              autoCorrect={false}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{text.lastName}</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder={text.lastNamePlaceholder}
              placeholderTextColor={theme.colors.textMuted}
              autoCapitalize="words"
              autoCorrect={false}
              textContentType="familyName"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{text.language}</Text>
            <View style={styles.languageRow}>
              {renderLanguageButton('en', 'English')}
              {renderLanguageButton('de', 'Deutsch')}
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            title={isLoading ? text.loading : text.submit}
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            style={styles.submitButton}
          />
        </Card>

        <Card style={styles.privacyCard}>
          <Text style={styles.privacyTitle}>{text.privacyTitle}</Text>
          <Text style={styles.privacyText}>{text.privacyText}</Text>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
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
  formCard: {
    marginTop: theme.spacing.lg,
  },
  cardTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  field: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    ...theme.typography.bodySmall,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    ...theme.typography.body,
  },
  languageRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
  },
  languageButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  languageButtonActive: {
    backgroundColor: theme.colors.black,
  },
  languageButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  languageButtonTextActive: {
    color: theme.colors.white,
  },
  errorText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  },
  submitButton: {
    marginTop: theme.spacing.sm,
  },
  privacyCard: {
    backgroundColor: theme.colors.primaryLight,
  },
  privacyTitle: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    fontWeight: '700',
  },
  privacyText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textPrimary,
    lineHeight: 21,
  },
});
