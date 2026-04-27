import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale();
const compactScale = screenWidth < 380 ? 0.94 : screenWidth > 430 ? 1.04 : 1;

const scaleFont = (size: number) =>
  Math.round((size * compactScale) / Math.max(1, fontScale * 0.92));

const scaleSpace = (size: number) => Math.round(size * compactScale);

const serifFamily = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'Georgia',
});

// Centralized theme file
export const colors = {
  primary: '#B85C38',
  primaryLight: '#D28359',
  primaryDark: '#8D4223',

  black: '#17120E',
  white: '#FFFFFF',
  lightGray: '#F5EFE9',
  gray: '#8F8376',
  darkGray: '#3B2D24',

  gold: '#C79A5C',
  beige: '#EAE0D4',
  earth: '#88644A',
  cream: '#FBF6F0',
  sand: '#D9C1A5',
  olive: '#6C6E4E',
  surfaceDark: '#201712',
  overlay: '#F1E4D5',

  success: '#3F7D4B',
  error: '#B44C3C',
  warning: '#C9862B',
  info: '#3B6997',

  border: '#E2D5C7',
  background: '#FBF6F0',
  surface: '#FFFDFC',
  surfaceAlt: '#F3E8DC',
  textPrimary: '#17120E',
  textSecondary: '#6F6258',
  textMuted: '#9A8C80',
  textLight: '#FFFFFF',
};

export const spacing = {
  xs: scaleSpace(4),
  sm: scaleSpace(8),
  md: scaleSpace(12),
  lg: scaleSpace(16),
  xl: scaleSpace(24),
  xxl: scaleSpace(32),
  xxxl: scaleSpace(48),
};

export const typography = {
  h1: {
    fontSize: scaleFont(34),
    fontWeight: '700' as const,
    lineHeight: scaleFont(42),
    fontFamily: serifFamily,
  },
  h2: {
    fontSize: scaleFont(30),
    fontWeight: '700' as const,
    lineHeight: scaleFont(38),
    fontFamily: serifFamily,
  },
  h3: {
    fontSize: scaleFont(26),
    fontWeight: '700' as const,
    lineHeight: scaleFont(34),
    fontFamily: serifFamily,
  },
  h4: {
    fontSize: scaleFont(22),
    fontWeight: '700' as const,
    lineHeight: scaleFont(30),
    fontFamily: serifFamily,
  },
  h5: { fontSize: scaleFont(18), fontWeight: '600' as const, lineHeight: scaleFont(25) },
  body: { fontSize: scaleFont(16), fontWeight: '400' as const, lineHeight: scaleFont(24) },
  bodySmall: { fontSize: scaleFont(14), fontWeight: '400' as const, lineHeight: scaleFont(21) },
  caption: { fontSize: scaleFont(12), fontWeight: '500' as const, lineHeight: scaleFont(16) },
  overline: {
    fontSize: scaleFont(11),
    fontWeight: '700' as const,
    lineHeight: scaleFont(14),
    letterSpacing: 0.8,
  },
};

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 14,
  xl: 20,
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
    shadowColor: '#3F2B1F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  lg: {
    shadowColor: '#3F2B1F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
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
