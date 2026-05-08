import { Dimensions, PixelRatio } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale();
const compactScale = screenWidth < 380 ? 0.94 : screenWidth > 430 ? 1.04 : 1;

const scaleFont = (size: number) =>
  Math.round((size * compactScale) / Math.max(1, fontScale * 0.92));

const scaleSpace = (size: number) => Math.round(size * compactScale);

export const fonts = {
  display: 'Sabana',
  body: 'WorkSans-Regular',
  bodyItalic: 'WorkSans-Italic',
  medium: 'WorkSans-Medium',
  semiBold: 'WorkSans-SemiBold',
  bold: 'WorkSans-Bold',
  support: 'Verdana',
  supportBold: 'Verdana-Bold',
};

// Centralized theme file
export const colors = {
  primary: '#DB7F32',
  primaryLight: 'rgba(219, 127, 50, 0.14)',
  primaryDark: '#DB7F32',

  black: '#000000',
  white: '#FFFFFF',
  lightGray: 'rgba(0, 0, 0, 0.06)',
  gray: 'rgba(0, 0, 0, 0.42)',
  darkGray: '#000000',

  gold: '#DB7F32',
  beige: 'rgba(219, 127, 50, 0.1)',
  earth: '#000000',
  cream: '#FFFFFF',
  sand: 'rgba(0, 0, 0, 0.08)',
  olive: '#000000',
  ocean: '#000000',
  sky: '#FFFFFF',
  surfaceDark: '#000000',
  overlay: 'rgba(219, 127, 50, 0.1)',

  success: '#000000',
  error: '#DB7F32',
  warning: '#DB7F32',
  info: '#000000',

  border: 'rgba(0, 0, 0, 0.14)',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: 'rgba(0, 0, 0, 0.045)',
  textPrimary: '#000000',
  textSecondary: 'rgba(0, 0, 0, 0.68)',
  textMuted: 'rgba(0, 0, 0, 0.42)',
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
    fontFamily: fonts.display,
  },
  h2: {
    fontSize: scaleFont(30),
    fontWeight: '700' as const,
    lineHeight: scaleFont(38),
    fontFamily: fonts.display,
  },
  h3: {
    fontSize: scaleFont(26),
    fontWeight: '700' as const,
    lineHeight: scaleFont(34),
    fontFamily: fonts.display,
  },
  h4: {
    fontSize: scaleFont(22),
    fontWeight: '700' as const,
    lineHeight: scaleFont(30),
    fontFamily: fonts.display,
  },
  h5: {
    fontSize: scaleFont(18),
    fontWeight: '600' as const,
    lineHeight: scaleFont(25),
    fontFamily: fonts.semiBold,
  },
  body: {
    fontSize: scaleFont(16),
    fontWeight: '400' as const,
    lineHeight: scaleFont(24),
    fontFamily: fonts.body,
  },
  bodySmall: {
    fontSize: scaleFont(14),
    fontWeight: '400' as const,
    lineHeight: scaleFont(21),
    fontFamily: fonts.body,
  },
  caption: {
    fontSize: scaleFont(12),
    fontWeight: '500' as const,
    lineHeight: scaleFont(16),
    fontFamily: fonts.medium,
  },
  overline: {
    fontSize: scaleFont(11),
    fontWeight: '700' as const,
    lineHeight: scaleFont(14),
    letterSpacing: 0.8,
    fontFamily: fonts.bold,
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
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  md: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  lg: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
};

export const theme = {
  colors,
  fonts,
  spacing,
  typography,
  radius,
  shadows,
};

export default theme;
