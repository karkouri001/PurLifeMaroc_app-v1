import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import en from './en.json';
import de from './de.json';

const resources = {
  en: { translation: en },
  de: { translation: de },
};

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Load saved language preference
const loadLanguagePreference = async () => {
  try {
    if (Platform.OS === 'web' && typeof window === 'undefined') {
      return;
    }

    const savedLang = await AsyncStorage.getItem('language');
    if (savedLang) {
      const lang = JSON.parse(savedLang);
      // eslint-disable-next-line import/no-named-as-default-member
      await i18n.changeLanguage(lang);
    }
  } catch (error) {
    console.error('Failed to load language preference:', error);
  }
};

loadLanguagePreference();

export default i18n;
