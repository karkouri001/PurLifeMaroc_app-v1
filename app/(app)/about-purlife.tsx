import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Card, Header, HeroBanner } from '../../src/components/Common';
import { GoogleMapCard } from '../../src/components/GoogleMapCard';
import { brandAssets } from '../../src/data/imageAssets';
import { companyInfo } from '../../src/data/companyInfo';
import { theme } from '../../src/theme/theme';

export default function AboutPurLifeScreen() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const locale = i18n.language === 'de' ? 'de' : 'en';

  const openUrl = async (url: string) => {
    await Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Header
        title="About Pur Life Maroc"
        subtitle="Company and contact overview"
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <HeroBanner
          eyebrow="Official brand overview"
          title={companyInfo.name}
          description={locale === 'de' ? companyInfo.aboutDe : companyInfo.aboutEn}
          accent={locale === 'de' ? companyInfo.taglineDe : companyInfo.taglineEn}
          imageSource={brandAssets.heroBanner}
          logoSource={brandAssets.logo}
        />

        <GoogleMapCard
          title="Agency on Google Maps"
          subtitle={locale === 'de' ? 'Essaouira, Atlantikkueste' : 'Essaouira, Atlantic coast'}
          points={[companyInfo.agencyMapPoint]}
        />

        <Card>
          <Text style={styles.sectionLabel}>Services</Text>
          {(locale === 'de' ? companyInfo.servicesDe : companyInfo.servicesEn).map((service) => (
            <View key={service} style={styles.listRow}>
              <View style={styles.dot} />
              <Text style={styles.listText}>{service}</Text>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>
            {locale === 'de' ? 'Why travelers trust the brand' : 'Why travelers trust the brand'}
          </Text>
          {(locale === 'de' ? companyInfo.trustSignalsDe : companyInfo.trustSignalsEn).map((signal) => (
            <View key={signal} style={styles.listRow}>
              <View style={styles.dot} />
              <Text style={styles.listText}>{signal}</Text>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>
            {locale === 'de' ? companyInfo.contactOffice.labelDe : companyInfo.contactOffice.labelEn}
          </Text>
          <Text style={styles.valueText}>{companyInfo.contactOffice.email}</Text>
          <Button
            title={locale === 'de' ? 'Email contact' : 'Email contact'}
            onPress={() => openUrl(`mailto:${companyInfo.contactOffice.email}`)}
            size="small"
            style={styles.cardButton}
          />
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>
            {locale === 'de' ? 'In-app email flow' : 'In-app email flow'}
          </Text>
          <Text style={styles.valueText}>
            {locale === 'de' ? companyInfo.appEmailFlowDe : companyInfo.appEmailFlowEn}
          </Text>
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>
            {locale === 'de' ? companyInfo.moroccoOffice.labelDe : companyInfo.moroccoOffice.labelEn}
          </Text>
          {companyInfo.moroccoOffice.addressLines.map((line) => (
            <Text key={line} style={styles.valueText}>{line}</Text>
          ))}
          <Text style={styles.valueText}>{companyInfo.moroccoOffice.phone}</Text>
          <Text style={styles.valueText}>{companyInfo.moroccoOffice.email}</Text>
          <View style={styles.buttonRow}>
            <Button
              title="Call"
              onPress={() => openUrl(`tel:${companyInfo.moroccoOffice.phone}`)}
              size="small"
              style={styles.inlineButton}
            />
            <Button
              title="Email"
              onPress={() => openUrl(`mailto:${companyInfo.moroccoOffice.email}`)}
              variant="secondary"
              size="small"
              style={styles.inlineButton}
            />
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>
            {locale === 'de' ? companyInfo.europeOffice.labelDe : companyInfo.europeOffice.labelEn}
          </Text>
          {companyInfo.europeOffice.addressLines.map((line) => (
            <Text key={line} style={styles.valueText}>{line}</Text>
          ))}
          <Text style={styles.valueText}>{companyInfo.europeOffice.phone}</Text>
        </Card>

        <Card>
          <Text style={styles.sectionLabel}>Experts</Text>
          {companyInfo.experts.map((expert) => (
            <View key={expert.name} style={styles.expertBlock}>
              <Text style={styles.expertName}>{expert.name}</Text>
              <Text style={styles.expertRole}>
                {locale === 'de' ? expert.roleDe : expert.roleEn}
              </Text>
              <Text style={styles.expertBio}>
                {locale === 'de' ? expert.bioDe : expert.bioEn}
              </Text>
            </View>
          ))}
        </Card>

        <Button
          title="Open official website"
          onPress={() => openUrl(companyInfo.website)}
        />
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
  sectionLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  valueText: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.md,
    marginTop: 6,
  },
  listText: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.textPrimary,
  },
  cardButton: {
    marginTop: theme.spacing.md,
    alignSelf: 'flex-start',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
  },
  inlineButton: {
    marginRight: theme.spacing.sm,
  },
  expertBlock: {
    marginBottom: theme.spacing.lg,
  },
  expertName: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  expertRole: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  expertBio: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
});
