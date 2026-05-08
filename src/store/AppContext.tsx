import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  UserPreferences,
  Favorite,
  Enquiry,
  ContentType,
  UISettings,
} from '../types';

const defaultUiSettings: UISettings = {
  extendIntoStatusBar: false,
};

interface AppContextType {
  // User preferences
  preferences: UserPreferences | null;
  setPreferences: (prefs: UserPreferences) => Promise<void>;
  
  // Favorites
  favorites: Favorite[];
  addFavorite: (type: ContentType, itemId: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorited: (type: ContentType, itemId: string) => boolean;

  // Enquiries
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Enquiry) => Promise<void>;
  
  // Language
  language: 'en' | 'de';
  setLanguage: (lang: 'en' | 'de') => Promise<void>;

  // UI settings
  uiSettings: UISettings;
  setExtendIntoStatusBar: (value: boolean) => Promise<void>;
  
  // Loading states
  isInitializing: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [preferences, setPreferencesState] = useState<UserPreferences | null>(
    null
  );
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [language, setLanguageState] = useState<'en' | 'de'>('en');
  const [uiSettings, setUiSettings] = useState<UISettings>(defaultUiSettings);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize from AsyncStorage
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const [savedPrefs, savedFavs, savedLang, savedEnquiries, savedUiSettings] =
          await Promise.all([
            AsyncStorage.getItem('preferences'),
            AsyncStorage.getItem('favorites'),
            AsyncStorage.getItem('language'),
            AsyncStorage.getItem('enquiries'),
            AsyncStorage.getItem('uiSettings'),
          ]);

        if (savedPrefs) setPreferencesState(JSON.parse(savedPrefs));
        if (savedFavs) setFavorites(JSON.parse(savedFavs));
        if (savedEnquiries) setEnquiries(JSON.parse(savedEnquiries));
        if (savedLang) setLanguageState(JSON.parse(savedLang));
        if (savedUiSettings) {
          setUiSettings({
            ...defaultUiSettings,
            ...JSON.parse(savedUiSettings),
          });
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, []);

  const setPreferences = async (prefs: UserPreferences) => {
    try {
      setPreferencesState(prefs);
      await AsyncStorage.setItem('preferences', JSON.stringify(prefs));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  const addFavorite = async (type: Favorite['type'], itemId: string) => {
    try {
      const existing = favorites.find(
        (favorite) => favorite.type === type && favorite.itemId === itemId
      );

      if (existing) {
        return;
      }

      const newFavorite: Favorite = {
        id: `${type}-${itemId}`,
        type,
        itemId,
        addedAt: Date.now(),
      };
      const updated = [newFavorite, ...favorites];
      setFavorites(updated);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to add favorite:', error);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      const updated = favorites.filter((fav) => fav.id !== id);
      setFavorites(updated);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  const isFavorited = (type: Favorite['type'], itemId: string): boolean => {
    return favorites.some((fav) => fav.type === type && fav.itemId === itemId);
  };

  const addEnquiry = async (enquiry: Enquiry) => {
    try {
      const updated = [...enquiries, enquiry];
      setEnquiries(updated);
      await AsyncStorage.setItem('enquiries', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to add enquiry:', error);
    }
  };

  const setLanguage = async (lang: 'en' | 'de') => {
    try {
      setLanguageState(lang);
      await AsyncStorage.setItem('language', JSON.stringify(lang));
    } catch (error) {
      console.error('Failed to set language:', error);
    }
  };

  const setExtendIntoStatusBar = async (value: boolean) => {
    try {
      const nextSettings = {
        ...uiSettings,
        extendIntoStatusBar: value,
      };
      setUiSettings(nextSettings);
      await AsyncStorage.setItem('uiSettings', JSON.stringify(nextSettings));
    } catch (error) {
      console.error('Failed to save UI settings:', error);
    }
  };

  const value: AppContextType = {
    preferences,
    setPreferences,
    favorites,
    addFavorite,
    removeFavorite,
    isFavorited,
    enquiries,
    addEnquiry,
    language,
    setLanguage,
    uiSettings,
    setExtendIntoStatusBar,
    isInitializing,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
