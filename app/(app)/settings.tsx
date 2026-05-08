import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../src/store/AppContext';
import { theme } from '../../src/theme/theme';
import { Header, Card } from '../../src/components/Common';

export default function SettingsScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { language, setLanguage, uiSettings, setExtendIntoStatusBar } = useAppContext();
  const [isEnglish, setIsEnglish] = React.useState(language === 'en');

  const handleLanguageToggle = async (value: boolean) => {
    setIsEnglish(value);
    const newLang: 'en' | 'de' = value ? 'en' : 'de';
    await setLanguage(newLang);
    await i18n.changeLanguage(newLang);
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('settings.title')}
        subtitle=""
        onBackPress={() => router.back()}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>English / Deutsch</Text>
              <Text style={styles.settingDescription}>
                {isEnglish ? 'Currently: English' : 'Currently: Deutsch'}
              </Text>
            </View>
            <Switch
              value={isEnglish}
              onValueChange={handleLanguageToggle}
              trackColor={{
                false: theme.colors.lightGray,
                true: theme.colors.primaryLight,
              }}
              thumbColor={isEnglish ? theme.colors.primary : theme.colors.gray}
            />
          </View>
        </Card>

        <Text style={[styles.sectionTitle, styles.spacedSectionTitle]}>
          Display
        </Text>
        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Extend under status bar</Text>
              <Text style={styles.settingDescription}>
                {uiSettings.extendIntoStatusBar
                  ? 'Edge-to-edge layout with content starting higher on the screen.'
                  : 'Default clean layout that keeps content clearly below the status bar.'}
              </Text>
            </View>
            <Switch
              value={uiSettings.extendIntoStatusBar}
              onValueChange={(value) => {
                void setExtendIntoStatusBar(value);
              }}
              trackColor={{
                false: theme.colors.lightGray,
                true: theme.colors.primaryLight,
              }}
              thumbColor={
                uiSettings.extendIntoStatusBar ? theme.colors.primary : theme.colors.gray
              }
            />
          </View>
        </Card>

        <Text style={[styles.sectionTitle, styles.spacedSectionTitle]}>
          About the company
        </Text>
        <TouchableOpacity onPress={() => router.push('/(app)/about-purlife' as never)}>
          <Card>
            <Text style={styles.settingLabel}>Pur Life Maroc</Text>
            <Text style={styles.settingDescription}>
              Services, contacts, agency address, and location map
            </Text>
          </Card>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, styles.spacedSectionTitle]}>
          About the app
        </Text>
        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>Pur Life Maroc Mobile App</Text>
          <Text style={styles.infoText}>
            The app focuses on Pur Life Maroc destinations, experiences, living
            references, saved items, recommendations, and a concierge email flow.
          </Text>
          <Text style={[styles.infoText, styles.spacedInfoText]}>
            Choose the layout mode that feels best on your device from the display section above.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  contentInner: {
    paddingBottom: theme.spacing.xxxl,
  },
  sectionTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    fontWeight: 'bold',
  },
  spacedSectionTitle: {
    marginTop: theme.spacing.xl,
  },
  settingCard: {
    marginBottom: theme.spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  settingLabel: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  settingDescription: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  infoCard: {
    backgroundColor: theme.colors.beige,
    marginBottom: theme.spacing.lg,
  },
  infoTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  infoText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  spacedInfoText: {
    marginTop: theme.spacing.md,
  },
});
