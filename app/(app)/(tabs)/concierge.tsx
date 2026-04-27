import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTopSpacing } from '../../../src/components/AppChrome';
import { theme } from '../../../src/theme/theme';
import { Button, Card, HeroBanner, SectionHeader } from '../../../src/components/Common';
import { privateChauffeurs } from '../../../src/data/conciergeData';
import { brandAssets } from '../../../src/data/imageAssets';

export default function ConciergeTab() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const locale = i18n.language === 'de' ? 'de' : 'en';
  const topSpacing = useTopSpacing(theme.spacing.lg);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <View style={[styles.heroWrap, { paddingTop: topSpacing }]}>
          <HeroBanner
            eyebrow="Private concierge"
            title="Guidance, insider tips, and human follow-up"
            description={
              locale === 'de'
                ? 'Dieser Bereich ist fuer Fragen, Ideen, Dining-Empfehlungen, Chauffeur-Hinweise und einen leichten E-Mail-Kontakt gedacht.'
                : 'This area is built for questions, ideas, dining guidance, chauffeur suggestions, and a light email contact flow.'
            }
            logoSource={brandAssets.logo}
            chips={['Chatbot', 'Drivers', 'Email concierge']}
          />
        </View>

        <SectionHeader title="What this app handles" />
        <View style={styles.sectionContent}>
          {[
            'Destination guidance and insider picks',
            'Dining inspiration and local favorites',
            'Signature routes and travel mood suggestions',
            'Private chauffeur recommendations',
          ].map((item) => (
            <Card key={item}>
              <Text style={styles.serviceText}>{item}</Text>
            </Card>
          ))}
        </View>

        <SectionHeader
          title="Featured chauffeurs"
          subtitle="Tap a profile to see more detail"
        />
        <View style={styles.sectionContent}>
          {privateChauffeurs.map((driver) => (
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
              <Card variant="elevated">
                <Text style={styles.driverName}>{driver.name}</Text>
                <Text style={styles.driverMeta}>{`${driver.baseCity} | ${driver.vehicleEn} | ${driver.rating}/5`}</Text>
                <Text style={styles.driverSummary}>
                  {locale === 'de' ? driver.summaryDe : driver.summaryEn}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <SectionHeader title="Need direct help?" />
        <View style={styles.sectionContent}>
          <TouchableOpacity onPress={() => router.push('/(app)/chatbot' as never)}>
            <Card>
              <Text style={styles.linkTitle}>Open concierge chatbot</Text>
              <Text style={styles.linkText}>
                {locale === 'de'
                  ? 'Schnelle Antworten zu Orten, Dining, Routen und Fahrern.'
                  : 'Fast answers about places, dining, routes, and drivers.'}
              </Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(app)/about-purlife' as never)}>
            <Card>
              <Text style={styles.linkTitle}>About Pur Life Maroc</Text>
              <Text style={styles.linkText}>
                {locale === 'de'
                  ? 'Firmenueberblick, Services, Kontakte und Agenturstandort.'
                  : 'Company overview, services, contacts, and agency location.'}
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Chat with concierge"
          onPress={() => router.push('/(app)/chatbot' as never)}
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
  },
  contentInner: {
    paddingBottom: 120,
  },
  heroWrap: {
    padding: theme.spacing.lg,
  },
  sectionContent: {
    paddingHorizontal: theme.spacing.lg,
  },
  serviceText: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
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
  linkTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  linkText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    backgroundColor: theme.colors.surface,
  },
});
