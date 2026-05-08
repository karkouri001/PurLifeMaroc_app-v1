import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  BirdDivider,
  Button,
  Card,
  Header,
  HeroBanner,
} from '../../src/components/Common';
import { brandAssets } from '../../src/data/imageAssets';
import {
  mockPreStaySession,
  PRESTAY_SESSION_STORAGE_KEY,
} from '../../src/services/PreStayApi';
import { theme } from '../../src/theme/theme';
import {
  PreStayChecklistItem,
  PreStayDay,
  PreStayLanguage,
  PreStayServiceCard,
  PreStaySession,
} from '../../src/types';

const copy = {
  en: {
    headerTitle: 'Pre-stay',
    headerSubtitle: 'Your Pur Life Maroc stay companion',
    welcome: 'Welcome',
    sourceEzus: 'Reservation system',
    sourceMock: 'Demo data',
    reservation: 'Reservation',
    reference: 'Reference',
    dates: 'Dates',
    destinations: 'Destinations',
    travelers: 'Travelers',
    manager: 'Concierge manager',
    countdownTitle: 'Before arrival',
    today: 'Arrival is today',
    daysLeft: 'days until arrival',
    readyText: 'Tap any item when it is done.',
    checklist: 'Arrival checklist',
    stayRhythm: 'Stay rhythm',
    documents: 'Documents',
    services: 'Services',
    openDocument: 'Open document',
    unavailableTitle: 'Document',
    unavailableMessage:
      'This document will be shared by the concierge when it is ready.',
    conciergeTitle: 'Need a refinement?',
    conciergeText:
      'Send one clear note about arrival, activities, documents, or room preferences.',
    conciergeButton: 'Message concierge',
    signOut: 'Sign out',
    dateConnector: 'to',
  },
  de: {
    headerTitle: 'Pre-Stay',
    headerSubtitle: 'Ihr Pur Life Maroc Begleiter',
    welcome: 'Willkommen',
    sourceEzus: 'Reservierungssystem',
    sourceMock: 'Demo-Daten',
    reservation: 'Reservierung',
    reference: 'Referenz',
    dates: 'Daten',
    destinations: 'Destinationen',
    travelers: 'Reisende',
    manager: 'Concierge Manager',
    countdownTitle: 'Vor Anreise',
    today: 'Anreise ist heute',
    daysLeft: 'Tage bis zur Anreise',
    readyText: 'Tippen Sie ein Element an, wenn es erledigt ist.',
    checklist: 'Ankunftscheckliste',
    stayRhythm: 'Aufenthaltsrhythmus',
    documents: 'Dokumente',
    services: 'Services',
    openDocument: 'Dokument oeffnen',
    unavailableTitle: 'Dokument',
    unavailableMessage:
      'Dieses Dokument wird vom Concierge geteilt, sobald es bereit ist.',
    conciergeTitle: 'Noch ein Detail?',
    conciergeText:
      'Senden Sie eine klare Notiz zu Ankunft, Aktivitaeten, Dokumenten oder Zimmerwuenschen.',
    conciergeButton: 'Concierge kontaktieren',
    signOut: 'Abmelden',
    dateConnector: 'bis',
  },
};

const dayInMs = 86400000;

export default function PrestayHomeScreen() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const locale: PreStayLanguage = i18n.language === 'de' ? 'de' : 'en';
  const text = copy[locale];
  const [session, setSession] = useState<PreStaySession | null>(null);
  const [checklist, setChecklist] = useState<PreStayChecklistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const stored = await AsyncStorage.getItem(PRESTAY_SESSION_STORAGE_KEY);
        const nextSession = stored
          ? (JSON.parse(stored) as PreStaySession)
          : mockPreStaySession({ language: locale });

        setSession(nextSession);
        setChecklist(nextSession.checklist);
      } catch {
        const fallback = mockPreStaySession({ language: locale });
        setSession(fallback);
        setChecklist(fallback.checklist);
      } finally {
        setIsLoading(false);
      }
    };

    void loadSession();
  }, [locale]);

  const daysUntilArrival = useMemo(() => {
    if (!session) {
      return 0;
    }

    const today = new Date();
    const start = new Date(session.reservation.startDate);
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    return Math.max(0, Math.ceil((start.getTime() - today.getTime()) / dayInMs));
  }, [session]);

  const toggleChecklistItem = (id: string) => {
    setChecklist((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const handleDocumentPress = async (url?: string) => {
    if (!url) {
      Alert.alert(text.unavailableTitle, text.unavailableMessage);
      return;
    }

    await Linking.openURL(url);
  };

  const handleServicePress = (service: PreStayServiceCard) => {
    if (service.route) {
      router.push(service.route as never);
    }
  };

  const handleSignOut = async () => {
    await AsyncStorage.removeItem(PRESTAY_SESSION_STORAGE_KEY);
    router.replace('/(app)/prestay-login' as never);
  };

  const getDayTitle = (day: PreStayDay) =>
    locale === 'de' ? day.titleDe : day.titleEn;

  const getDayLabel = (day: PreStayDay) =>
    locale === 'de' ? day.labelDe : day.labelEn;

  const getDayText = (day: PreStayDay) =>
    locale === 'de' ? day.textDe : day.textEn;

  const getChecklistTitle = (item: PreStayChecklistItem) =>
    locale === 'de' ? item.titleDe : item.titleEn;

  const getChecklistText = (item: PreStayChecklistItem) =>
    locale === 'de' ? item.textDe : item.textEn;

  const getServiceTitle = (service: PreStayServiceCard) =>
    locale === 'de' ? service.titleDe : service.titleEn;

  const getServiceText = (service: PreStayServiceCard) =>
    locale === 'de' ? service.textDe : service.textEn;

  const getServiceAction = (service: PreStayServiceCard) =>
    locale === 'de' ? service.actionDe : service.actionEn;

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  if (isLoading || !session) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    );
  }

  const sourceLabel =
    session.source === 'ezus' ? text.sourceEzus : text.sourceMock;
  const guestName = [session.guest.firstName, session.guest.lastName]
    .filter(Boolean)
    .join(' ');

  return (
    <View style={styles.container}>
      <Header
        title={text.headerTitle}
        subtitle={text.headerSubtitle}
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInner}
      >
        <HeroBanner
          eyebrow={sourceLabel}
          title={`${text.welcome}, ${guestName}`}
          description={`${session.reservation.title} - ${formatDate(
            session.reservation.startDate
          )} ${text.dateConnector} ${formatDate(session.reservation.endDate)}`}
          accent={session.reservation.status}
          chips={[
            session.reservation.reference,
            session.reservation.durationLabel,
            session.reservation.destinations.join(' / '),
          ]}
          imageSource={brandAssets.heroBanner}
          logoSource={brandAssets.logo}
        />

        <Card style={styles.countdownCard}>
          <View style={styles.countdownRow}>
            <View style={styles.countdownBadge}>
              <Text style={styles.countdownValue}>{daysUntilArrival}</Text>
            </View>
            <View style={styles.countdownTextWrap}>
              <Text style={styles.countdownTitle}>{text.countdownTitle}</Text>
              <Text style={styles.countdownBody}>
                {daysUntilArrival === 0 ? text.today : text.daysLeft}
              </Text>
              <Text style={styles.countdownSmall}>{text.readyText}</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>{text.reservation}</Text>
          <BirdDivider compact />
          <View style={styles.detailGrid}>
            <Detail label={text.reference} value={session.reservation.reference} />
            <Detail
              label={text.dates}
              value={`${formatDate(session.reservation.startDate)} ${text.dateConnector} ${formatDate(
                session.reservation.endDate
              )}`}
            />
            <Detail
              label={text.destinations}
              value={session.reservation.destinations.join(', ')}
            />
            <Detail label={text.travelers} value={session.reservation.travelersLabel} />
            <Detail label={text.manager} value={session.reservation.managerName} />
          </View>
        </Card>

        <View style={styles.sectionBlock}>
          <Text style={styles.screenSectionTitle}>{text.checklist}</Text>
          {checklist.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => toggleChecklistItem(item.id)}
              activeOpacity={0.82}
            >
              <Card style={item.done ? styles.doneCard : undefined}>
                <View style={styles.checklistRow}>
                  <View style={[styles.checkIcon, item.done ? styles.checkIconDone : null]}>
                    <Ionicons
                      name={item.done ? 'checkmark' : 'ellipse-outline'}
                      size={item.done ? 18 : 16}
                      color={item.done ? theme.colors.white : theme.colors.primary}
                    />
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.itemTitle}>{getChecklistTitle(item)}</Text>
                    <Text style={styles.smallText}>{getChecklistText(item)}</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.screenSectionTitle}>{text.stayRhythm}</Text>
          {session.days.map((day) => (
            <Card key={day.id}>
              <Text style={styles.eyebrow}>{getDayLabel(day)}</Text>
              <Text style={styles.itemTitle}>{getDayTitle(day)}</Text>
              <Text style={styles.bodyText}>{getDayText(day)}</Text>
            </Card>
          ))}
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.screenSectionTitle}>{text.documents}</Text>
          {session.documents.map((document) => (
            <TouchableOpacity
              key={document.id}
              onPress={() => void handleDocumentPress(document.url)}
              activeOpacity={0.82}
            >
              <Card>
                <View style={styles.documentRow}>
                  <View style={styles.documentIcon}>
                    <Ionicons
                      name="document-text-outline"
                      size={22}
                      color={theme.colors.primary}
                    />
                  </View>
                  <View style={styles.flex}>
                    <Text style={styles.itemTitle}>{document.title}</Text>
                    <Text style={styles.smallText}>{text.openDocument}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={theme.colors.primary}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.screenSectionTitle}>{text.services}</Text>
          {session.services.map((service) => (
            <Card key={service.id}>
              <Text style={styles.itemTitle}>{getServiceTitle(service)}</Text>
              <Text style={styles.bodyText}>{getServiceText(service)}</Text>
              <TouchableOpacity
                style={styles.inlineAction}
                onPress={() => handleServicePress(service)}
                disabled={!service.route}
              >
                <Text
                  style={[
                    styles.inlineActionText,
                    !service.route ? styles.inlineActionTextMuted : null,
                  ]}
                >
                  {getServiceAction(service)}
                </Text>
                {service.route ? (
                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color={theme.colors.primary}
                  />
                ) : null}
              </TouchableOpacity>
            </Card>
          ))}
        </View>

        <Card style={styles.conciergeCard}>
          <Text style={styles.sectionTitle}>{text.conciergeTitle}</Text>
          <Text style={styles.bodyText}>{text.conciergeText}</Text>
          <Button
            title={text.conciergeButton}
            onPress={() => router.push('/(app)/enquiry' as never)}
            style={styles.cardButton}
          />
        </Card>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>{text.signOut}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  contentInner: {
    paddingBottom: theme.spacing.xxxl,
  },
  countdownCard: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.black,
    borderColor: theme.colors.black,
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countdownBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.lg,
  },
  countdownValue: {
    ...theme.typography.h2,
    color: theme.colors.white,
  },
  countdownTextWrap: {
    flex: 1,
  },
  sectionTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  countdownTitle: {
    ...theme.typography.h5,
    color: theme.colors.white,
    marginBottom: theme.spacing.sm,
  },
  countdownBody: {
    ...theme.typography.bodySmall,
    color: theme.colors.white,
    lineHeight: 21,
  },
  countdownSmall: {
    ...theme.typography.caption,
    color: 'rgba(255, 255, 255, 0.78)',
    lineHeight: 18,
  },
  screenSectionTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  bodyText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  smallText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  detailGrid: {
    marginTop: theme.spacing.md,
  },
  detailItem: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: theme.spacing.md,
  },
  detailLabel: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
  },
  detailValue: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  sectionBlock: {
    marginTop: theme.spacing.lg,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginRight: theme.spacing.md,
  },
  checkIconDone: {
    backgroundColor: theme.colors.primary,
  },
  doneCard: {
    backgroundColor: theme.colors.primaryLight,
  },
  flex: {
    flex: 1,
  },
  itemTitle: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  eyebrow: {
    ...theme.typography.overline,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primaryLight,
    marginRight: theme.spacing.md,
  },
  inlineAction: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: theme.spacing.md,
  },
  inlineActionText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: '700',
    marginRight: theme.spacing.xs,
  },
  inlineActionTextMuted: {
    color: theme.colors.textMuted,
  },
  conciergeCard: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.primaryLight,
  },
  cardButton: {
    marginTop: theme.spacing.lg,
  },
  signOutButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  signOutText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    fontWeight: '700',
  },
});
