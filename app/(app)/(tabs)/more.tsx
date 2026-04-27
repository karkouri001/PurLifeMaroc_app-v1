import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../../src/store/AppContext';
import { useTranslation } from 'react-i18next';
import { useTopSpacing } from '../../../src/components/AppChrome';
import { theme } from '../../../src/theme/theme';
import { Card, Button } from '../../../src/components/Common';

export default function MoreTab() {
  const router = useRouter();
  const { language, setLanguage } = useAppContext();
  const { i18n } = useTranslation();
  const locale = i18n.language === 'de' ? 'de' : 'en';
  const headerTopPadding = useTopSpacing(theme.spacing.lg);

  const handleLanguageChange = async () => {
    const newLang = language === 'en' ? 'de' : 'en';
    await setLanguage(newLang);
    await i18n.changeLanguage(newLang);
  };

  const handleContactSupport = () => {
    Alert.alert(
      locale === 'de' ? 'Support' : 'Support',
      locale === 'de'
        ? 'Fuer dieses akademische MVP bleibt der Concierge-Kontakt per E-Mail.'
        : 'For this academic MVP, concierge contact stays email-based.',
      [
        { text: locale === 'de' ? 'Schliessen' : 'Close', style: 'cancel' },
        { text: 'OK', style: 'default' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, { paddingTop: headerTopPadding }]}>
        <Text style={styles.title}>{locale === 'de' ? 'Mehr' : 'More'}</Text>
        <Text style={styles.subtitle}>
          {locale === 'de'
            ? 'Sprache, Hilfe und Projektinformationen'
            : 'Language, help, and project information'}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <TouchableOpacity onPress={() => router.push('/(app)/travel-styles-list' as never)}>
            <Card>
              <View style={styles.settingRow}>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Travel style</Text>
                  <Text style={styles.settingDescription}>
                    {locale === 'de'
                      ? 'Passe den Stil fuer Empfehlungen an'
                      : 'Adjust the style used for recommendations'}
                  </Text>
                </View>
                <Text style={styles.settingArrow}>{'>'}</Text>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(app)/settings' as never)}>
            <Card>
              <View style={styles.settingRow}>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Language and app info</Text>
                  <Text style={styles.settingDescription}>
                    {locale === 'de'
                      ? 'Oeffne die kompakten Einstellungen'
                      : 'Open the compact settings screen'}
                  </Text>
                </View>
                <Text style={styles.settingArrow}>{'>'}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App setup</Text>

          <Card>
            <View style={styles.settingRow}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Language</Text>
                <Text style={styles.settingDescription}>
                  {language === 'en' ? 'English' : 'Deutsch'}
                </Text>
              </View>
              <Button
                title={language === 'en' ? 'DE' : 'EN'}
                onPress={handleLanguageChange}
                variant="secondary"
                size="small"
              />
            </View>
          </Card>

          <Card>
            <View style={styles.settingRow}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Display and status bar</Text>
                <Text style={styles.settingDescription}>
                  {locale === 'de'
                    ? 'Choose a clean top inset or edge-to-edge layout'
                    : 'Choose a clean top inset or edge-to-edge layout'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/(app)/settings' as never)}>
                <Text style={styles.settingArrow}>{'>'}</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planning tools</Text>

          <TouchableOpacity onPress={() => router.push('/(app)/search' as never)}>
            <Card>
              <View style={styles.settingRow}>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Search and filters</Text>
                  <Text style={styles.settingDescription}>
                    {locale === 'de'
                      ? 'Search destinations, activities, stays, and dining in one place'
                      : 'Search destinations, activities, stays, and dining in one place'}
                  </Text>
                </View>
                <Text style={styles.settingArrow}>{'>'}</Text>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(app)/trip-planner' as never)}>
            <Card>
              <View style={styles.settingRow}>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Trip planner</Text>
                  <Text style={styles.settingDescription}>
                    {locale === 'de'
                      ? 'Build a simple day-by-day route from saved ideas'
                      : 'Build a simple day-by-day route from saved ideas'}
                  </Text>
                </View>
                <Text style={styles.settingArrow}>{'>'}</Text>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(app)/budget-estimator' as never)}>
            <Card>
              <View style={styles.settingRow}>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Budget estimator</Text>
                  <Text style={styles.settingDescription}>
                    {locale === 'de'
                      ? 'Preview a travel range before reaching out'
                      : 'Preview a travel range before reaching out'}
                  </Text>
                </View>
                <Text style={styles.settingArrow}>{'>'}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help</Text>

          <TouchableOpacity onPress={handleContactSupport}>
            <Card>
              <View style={styles.settingRow}>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Contact support</Text>
                  <Text style={styles.settingDescription}>
                    {locale === 'de'
                      ? 'Erklaert den Concierge-E-Mail-Flow'
                      : 'Explains the concierge email flow'}
                  </Text>
                </View>
                <Text style={styles.settingArrow}>{'>'}</Text>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(app)/chatbot' as never)}>
            <Card>
              <View style={styles.settingRow}>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Open chatbot</Text>
                  <Text style={styles.settingDescription}>
                    {locale === 'de'
                      ? 'Frage nach Orten, Fahrern, Dining oder Routen'
                      : 'Ask about places, drivers, dining, or routes'}
                  </Text>
                </View>
                <Text style={styles.settingArrow}>{'>'}</Text>
              </View>
            </Card>
          </TouchableOpacity>

        </View>

        <View style={styles.section}>
          <Card>
            <View style={styles.aboutBox}>
              <Text style={styles.aboutTitle}>Pur Life Maroc</Text>
              <Text style={styles.aboutVersion}>v1.0.0</Text>
              <Text style={styles.aboutText}>
                {locale === 'de'
                  ? 'Curated mobile companion for Morocco travel.'
                  : 'Curated mobile companion for Morocco travel.'}
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  headerContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingBottom: theme.spacing.xxxl,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  settingDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  settingArrow: {
    fontSize: 20,
    color: theme.colors.primary,
    marginLeft: theme.spacing.lg,
  },
  aboutBox: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  aboutTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  aboutVersion: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  aboutText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
  },
});
