import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../src/store/AppContext';
import { useTranslation } from 'react-i18next';
import { theme } from '../../src/theme/theme';
import { Button, Card, Header, HeroBanner } from '../../src/components/Common';
import { travelStyles } from '../../src/data/mockData';
import { brandAssets } from '../../src/data/imageAssets';
import { TravelStyle, UserPreferences } from '../../src/types';

export default function TravelStylesListScreen() {
  const router = useRouter();
  const { preferences, setPreferences } = useAppContext();
  const { i18n, t } = useTranslation();
  const [selectedStyle, setSelectedStyle] = useState<string | null>(
    preferences?.travelStyle || null
  );
  const locale = i18n.language === 'de' ? 'de' : 'en';

  const handleContinue = async () => {
    if (!selectedStyle) {
      return;
    }

    const updated: UserPreferences = {
      travelStyle: selectedStyle,
      budget: preferences?.budget ?? null,
      duration: preferences?.duration ?? null,
      interests: preferences?.interests ?? [],
      preferredDestinations: preferences?.preferredDestinations ?? [],
      accommodationPreference: preferences?.accommodationPreference ?? null,
    };

    await setPreferences(updated);
    router.back();
  };

  const renderStyleCard = ({ item }: { item: TravelStyle }) => {
    const selected = selectedStyle === item.id;

    return (
      <TouchableOpacity onPress={() => setSelectedStyle(item.id)} activeOpacity={0.8}>
        <Card style={[styles.card, selected ? styles.cardSelected : undefined]}>
          <Text style={styles.cardTitle}>
            {locale === 'de' ? item.nameDe : item.nameEn}
          </Text>
          <Text style={styles.cardDescription}>
            {locale === 'de' ? item.descriptionDe : item.descriptionEn}
          </Text>
          <Text style={styles.cardTag}>{selected ? 'Selected' : 'Tap to choose'}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('screens.travel-styles')}
        subtitle={t('screens.select-your-style')}
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <HeroBanner
          eyebrow="Pur Life Maroc"
          title="Four ways to discover Morocco"
          description="Choose the travel mood that should guide the recommendation engine."
          logoSource={brandAssets.logo}
        />

        <FlatList
          data={travelStyles}
          renderItem={renderStyleCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={t('screens.continue')}
          onPress={handleContinue}
          disabled={!selectedStyle}
        />
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
  listContent: {
    marginTop: theme.spacing.lg,
  },
  card: {
    borderColor: theme.colors.border,
  },
  cardSelected: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    backgroundColor: theme.colors.surfaceAlt,
  },
  cardTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  cardDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  cardTag: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '700',
    marginTop: theme.spacing.md,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    backgroundColor: theme.colors.surface,
  },
});
