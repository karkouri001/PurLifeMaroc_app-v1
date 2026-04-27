import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../src/theme/theme';

const TabNavigator = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          
          if (route.name === 'index') {
            iconName = 'home';
          } else if (route.name === 'explore') {
            iconName = 'compass';
          } else if (route.name === 'favorites') {
            iconName = 'heart';
          } else if (route.name === 'concierge') {
            iconName = 'chatbubble';
          } else if (route.name === 'more') {
            iconName = 'menu';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
          height: 60 + Math.max(insets.bottom, 8),
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: t('navigation.home') }} />
      <Tabs.Screen name="explore" options={{ title: t('navigation.explore') }} />
      <Tabs.Screen name="favorites" options={{ title: t('navigation.favorites') }} />
      <Tabs.Screen name="concierge" options={{ title: t('navigation.concierge') }} />
      <Tabs.Screen name="more" options={{ title: t('common.more') }} />
    </Tabs>
  );
};

export default TabNavigator;
