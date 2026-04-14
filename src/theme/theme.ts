// Centralized theme file
export const colors = {
  // Primary colors
  primary: '#E67E22', // Warm orange
  primaryLight: '#F39C12',
  primaryDark: '#D35400',

  // Secondary colors
  black: '#1A1A1A',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#8B8B8B',
  darkGray: '#3A3A3A',

  // Accent colors
  gold: '#D4A574',
  beige: '#F4EBE0',
  earth: '#A67C52',
  cream: '#FAF6F1',

  // Status colors
  success: '#27AE60',
  error: '#E74C3C',
  warning: '#F39C12',
  info: '#3498DB',

  // Semantic colors
  border: '#E8E8E8',
  background: '#FFFFFF',
  surface: '#F9F9F9',
  textPrimary: '#1A1A1A',
  textSecondary: '#8B8B8B',
  textLight: '#FFFFFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const typography = {
  // Font sizes
  h1: { fontSize: 32, fontWeight: 'bold' as const, lineHeight: 40 },
  h2: { fontSize: 28, fontWeight: 'bold' as const, lineHeight: 36 },
  h3: { fontSize: 24, fontWeight: 'bold' as const, lineHeight: 32 },
  h4: { fontSize: 20, fontWeight: 'bold' as const, lineHeight: 28 },
  h5: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  overline: { fontSize: 11, fontWeight: '600' as const, lineHeight: 14 },
};

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const theme = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
};

export default theme;
