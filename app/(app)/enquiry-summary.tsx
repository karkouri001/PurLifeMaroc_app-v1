import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '../../src/store/AppContext';
import { useTranslation } from 'react-i18next';
import { theme } from '../../src/theme/theme';
import { Button, Card, Header, HeroBanner } from '../../src/components/Common';
import {
  destinations,
  activities,
  accommodations,
} from '../../src/data/mockData';
import { companyInfo } from '../../src/data/companyInfo';
import { emailUtils } from '../../src/utils/helpers';
import { Enquiry } from '../../src/types';

export default function EnquirySummaryScreen() {
  const router = useRouter();
  const { enquiryId, autoOpenEmail } = useLocalSearchParams<{
    enquiryId: string;
    autoOpenEmail?: string;
  }>();
  const { enquiries } = useAppContext();
  const { i18n, t } = useTranslation();
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [openingEmail, setOpeningEmail] = useState(false);
  const autoOpenTriggeredRef = useRef(false);
  const locale = i18n.language === 'de' ? 'de' : 'en';

  useEffect(() => {
    const found = enquiries.find((item) => item.id === enquiryId);
    setEnquiry(found || null);
  }, [enquiryId, enquiries]);

  const handleOpenEmailDraft = useCallback(async (showFailureAlert = true) => {
    if (!enquiry) {
      return;
    }

    try {
      setOpeningEmail(true);
      const opened = await emailUtils.sendEnquiryEmail(
        enquiry,
        destinations,
        activities,
        accommodations
      );

      if (!opened && showFailureAlert) {
        Alert.alert(t('screens.error'), t('screens.failed-open-email-draft'));
      }
    } finally {
      setOpeningEmail(false);
    }
  }, [enquiry, t]);

  useEffect(() => {
    if (autoOpenEmail !== '1' || !enquiry || autoOpenTriggeredRef.current) {
      return;
    }

    autoOpenTriggeredRef.current = true;
    void handleOpenEmailDraft(false);
  }, [autoOpenEmail, enquiry, handleOpenEmailDraft]);

  if (!enquiry) {
    return (
      <View style={styles.container}>
        <Header title={t('screens.confirmation')} onBackPress={() => router.back()} />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>{t('screens.enquiry-not-found')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={t('screens.confirmation')}
        subtitle={locale === 'de' ? 'Guidance request created' : 'Guidance request created'}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
          <HeroBanner
            eyebrow="Next step"
            title={locale === 'de' ? 'Your email draft is ready' : 'Your email draft is ready'}
            description={
              locale === 'de'
                ? 'Die App hat die Anfrage gespeichert und versucht, den echten Mail-Entwurf fuer einen menschlichen Follow-up zu oeffnen.'
                : 'The app has stored the request and is trying to open the real email draft for a human follow-up.'
            }
            accent={enquiry.id}
          />

        <Card>
          <Text style={styles.summaryTitle}>
            {locale === 'de' ? 'Request snapshot' : 'Request snapshot'}
          </Text>
          <SummaryRow label={t('screens.full-name')} value={enquiry.name} />
          <SummaryRow label={t('screens.email')} value={enquiry.email} />
          {enquiry.phone ? (
            <SummaryRow label={t('screens.phone-number')} value={enquiry.phone} />
          ) : null}
          {enquiry.startDate ? (
            <SummaryRow label={t('screens.start-date')} value={enquiry.startDate} />
          ) : null}
          {enquiry.duration ? (
            <SummaryRow label={t('screens.duration')} value={enquiry.duration} />
          ) : null}
          <SummaryRow
            label={locale === 'de' ? 'Message' : 'Message'}
            value={enquiry.specialRequests}
            multiline
          />
        </Card>

        <Card>
          <Text style={styles.summaryTitle}>
            {locale === 'de' ? 'What happens now' : 'What happens now'}
          </Text>
          <Text style={styles.bodyText}>
            {locale === 'de'
              ? '1. Die App versucht, einen E-Mail-Entwurf zu oeffnen. 2. Ein echter Concierge kann den Kontext lesen. 3. Die Antwort erfolgt menschlich und nicht als automatisierte Buchungsbestaetigung.'
              : '1. The app tries to open an email draft. 2. A real concierge can read the context. 3. The reply stays human rather than pretending to be an automated reservation confirmation.'}
          </Text>
        </Card>

        <Card>
          <Text style={styles.summaryTitle}>
            {locale === 'de' ? 'Where the email goes' : 'Where the email goes'}
          </Text>
          <Text style={styles.bodyText}>
            {locale === 'de'
              ? `Beim Absenden wurde die Anfrage in der App gespeichert und der Entwurf an ${companyInfo.contactOffice.email} vorbereitet. Wirklich verschickt wird er aber erst, wenn Sie ihn in Ihrer Mail-App senden.`
              : `Submitting stored the request inside the app and prepared the draft to ${companyInfo.contactOffice.email}. It is only truly sent if you send it from your mail app.`}
          </Text>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={locale === 'de' ? 'Open email draft' : 'Open email draft'}
          onPress={() => {
            void handleOpenEmailDraft();
          }}
          loading={openingEmail}
        />
        <Button
          title={locale === 'de' ? 'Back to home' : 'Back to home'}
          onPress={() => router.replace('/(app)/(tabs)' as never)}
          variant="outline"
          style={styles.secondaryButton}
        />
        <TouchableOpacity
          onPress={() => router.push('/(app)/chatbot' as never)}
          style={styles.textButton}
        >
          <Text style={styles.textButtonLabel}>
            {locale === 'de' ? 'Continue with chatbot' : 'Continue with chatbot'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SummaryRow({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <View style={[styles.summaryRow, multiline ? styles.summaryRowMultiline : undefined]}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, multiline ? styles.summaryValueMultiline : undefined]}>
        {value}
      </Text>
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
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    ...theme.typography.body,
    color: theme.colors.error,
  },
  summaryTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
  },
  summaryRowMultiline: {
    alignItems: 'flex-start',
  },
  summaryLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    marginRight: theme.spacing.md,
  },
  summaryValue: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  summaryValueMultiline: {
    textAlign: 'left',
  },
  bodyText: {
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
  secondaryButton: {
    marginTop: theme.spacing.md,
  },
  textButton: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  textButtonLabel: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
