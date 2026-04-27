import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../src/store/AppContext';
import { useTranslation } from 'react-i18next';
import { useTopSpacing } from '../../src/components/AppChrome';
import { theme } from '../../src/theme/theme';
import { Button, Card } from '../../src/components/Common';
import { brandAssets } from '../../src/data/imageAssets';

export default function LanguageSelectScreen() {
  const router = useRouter();
  const { setLanguage } = useAppContext();
  const { i18n } = useTranslation();
  const topSpacing = useTopSpacing(theme.spacing.xl);

  const handleLanguageSelect = async (lang: 'en' | 'de') => {
    await setLanguage(lang);
    await i18n.changeLanguage(lang);
    router.replace('/(app)/onboarding');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: topSpacing }]}
    >
      <View style={styles.header}>
        <Image source={brandAssets.logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Select your language</Text>
        <Text style={styles.subtitle}>Waehlen Sie Ihre Sprache</Text>
      </View>

      <Card style={styles.languageCard}>
        <Text style={styles.cardLabel}>English</Text>
        <Text style={styles.cardText}>
          Continue the app in English for international travelers.
        </Text>
        <Button
          title="Continue in English"
          onPress={() => handleLanguageSelect('en')}
          variant="primary"
          size="large"
          style={styles.langButton}
        />
      </Card>

      <Card style={styles.languageCard}>
        <Text style={styles.cardLabel}>Deutsch</Text>
        <Text style={styles.cardText}>
          Setze die App auf Deutsch fuer deutschsprachige Reisende.
        </Text>
        <Button
          title="Weiter auf Deutsch"
          onPress={() => handleLanguageSelect('de')}
          variant="secondary"
          size="large"
          style={styles.langButton}
        />
      </Card>

      <Text style={styles.footer}>You can switch language again from Settings.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxxl,
  },
  logo: {
    width: 112,
    height: 112,
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  languageCard: {
    marginBottom: theme.spacing.xl,
    marginHorizontal: 0,
  },
  cardLabel: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  cardText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
    marginBottom: theme.spacing.lg,
  },
  langButton: {
    width: '100%',
  },
  footer: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
});
