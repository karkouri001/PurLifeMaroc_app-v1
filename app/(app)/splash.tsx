import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../../src/theme/theme';
import { brandAssets } from '../../src/data/imageAssets';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(app)/language-select');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.glowLarge} />
      <View style={styles.glowSmall} />
      <View style={styles.content}>
        <Image source={brandAssets.logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Pur Life Maroc</Text>
        <Text style={styles.subtitle}>Luxury guidance for Morocco</Text>
      </View>
      <Text style={styles.footer}>
        Curated stays, routes, dining, and concierge support
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  glowLarge: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(184, 92, 56, 0.12)',
    top: 70,
    right: -40,
  },
  glowSmall: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(217, 193, 165, 0.22)',
    bottom: 130,
    left: -30,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primaryDark,
    marginBottom: theme.spacing.md,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.h5,
    color: theme.colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
