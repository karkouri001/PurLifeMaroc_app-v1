import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { theme } from '../../src/theme/theme';
import { Header, HeroBanner } from '../../src/components/Common';
import { ChatbotService } from '../../src/services/ChatbotService';
import { ChatMessage } from '../../src/types';
import { brandAssets } from '../../src/data/imageAssets';

export default function ChatbotScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const chatbotService = useMemo(
    () => new ChatbotService(i18n.language === 'de' ? 'de' : 'en'),
    [i18n.language]
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    chatbotService.getGreeting(),
  ]);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(
    chatbotService.getSuggestedPrompts()
  );
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setMessages([chatbotService.getGreeting()]);
    setSuggestedPrompts(chatbotService.getSuggestedPrompts());
  }, [chatbotService]);

  useEffect(() => {
    if (!listRef.current || messages.length === 0) {
      return;
    }

    const timer = setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 120);

    return () => clearTimeout(timer);
  }, [messages]);

  const sendMessage = (text: string) => {
    const messageText = text.trim();
    if (!messageText) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: messageText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setSuggestedPrompts(chatbotService.getFollowUpPrompts(messageText));
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      const response = chatbotService.generateResponse(messageText);
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 450);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isBot = item.type === 'bot';

    return (
      <View
        style={[
          styles.messageRow,
          { justifyContent: isBot ? 'flex-start' : 'flex-end' },
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isBot ? styles.botBubble : styles.userBubble,
          ]}
        >
          <Text style={[styles.messageText, isBot ? styles.botText : styles.userText]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
    >
      <Header
        title={t('screens.concierge-chat')}
        subtitle={t('screens.24-7-support')}
        onBackPress={() => router.back()}
      />

      <FlatList
        ref={listRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <HeroBanner
              eyebrow="Pur Life Maroc"
              title={
                i18n.language === 'de'
                  ? 'Antworten zu Marke, Services und Marokko-Inhalten'
                  : 'Answers about the brand, services, and Morocco content'
              }
              description={
                i18n.language === 'de'
                  ? 'Frag nach Pur Life Maroc, Private Concierge, Private Chauffeur, Reisezielen, Routen, Kontakt oder dem E-Mail-Ablauf.'
                  : 'Ask about Pur Life Maroc, private concierge, private chauffeur, destinations, routes, contact details, or the email flow.'
              }
              accent="Guidance only"
              logoSource={brandAssets.logo}
              chips={suggestedPrompts.slice(0, 3)}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.promptRow}
            >
              {suggestedPrompts.map((prompt) => (
                <TouchableOpacity
                  key={prompt}
                  style={styles.promptChip}
                  onPress={() => sendMessage(prompt)}
                >
                  <Text style={styles.promptChipText}>{prompt}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        }
      />

      {isLoading ? (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
          <Text style={styles.typingText}>{t('screens.typing')}</Text>
        </View>
      ) : null}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('screens.send-message')}
          placeholderTextColor={theme.colors.textMuted}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            { opacity: isLoading || !inputText.trim() ? 0.45 : 1 },
          ]}
          onPress={() => sendMessage(inputText)}
          disabled={isLoading || !inputText.trim()}
        >
          <Text style={styles.sendButtonText}>
            {i18n.language === 'de' ? 'Senden' : 'Send'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listHeader: {
    marginBottom: theme.spacing.lg,
  },
  messagesList: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  promptRow: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  promptChip: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },
  promptChipText: {
    ...theme.typography.caption,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '84%',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.xl,
  },
  botBubble: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  userBubble: {
    backgroundColor: theme.colors.primary,
  },
  messageText: {
    ...theme.typography.body,
    lineHeight: 22,
  },
  botText: {
    color: theme.colors.textPrimary,
  },
  userText: {
    color: theme.colors.white,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  typingText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    alignItems: 'flex-end',
    backgroundColor: theme.colors.surface,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sendButton: {
    marginLeft: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    minWidth: 72,
    height: 48,
    borderRadius: theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.white,
    fontWeight: '700',
  },
});
