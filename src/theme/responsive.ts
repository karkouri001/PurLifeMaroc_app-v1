import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { theme } from './theme';

type ResponsiveLayoutOptions = {
  horizontalPadding?: number;
  gap?: number;
  minTwoColumnWidth?: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function useResponsiveLayout(options: ResponsiveLayoutOptions = {}) {
  const { width, fontScale } = useWindowDimensions();
  const horizontalPadding = options.horizontalPadding ?? theme.spacing.lg;
  const gap = options.gap ?? theme.spacing.md;
  const minTwoColumnWidth = options.minTwoColumnWidth ?? 150;

  return useMemo(() => {
    const availableWidth = Math.max(width - horizontalPadding * 2, 0);
    const supportsTwoColumns = availableWidth >= minTwoColumnWidth * 2 + gap;
    const columns = supportsTwoColumns ? 2 : 1;
    const itemWidth =
      columns === 1 ? availableWidth : Math.floor((availableWidth - gap) / columns);

    const heroPadding = clamp(Math.round(width * 0.05), theme.spacing.lg, theme.spacing.xl);
    const heroMinHeight =
      clamp(Math.round(width * 0.55), 200, 236) +
      (fontScale > 1.15 ? theme.spacing.lg : 0);
    const heroGlowLargeSize = clamp(Math.round(width * 0.42), 136, 184);
    const heroGlowSmallSize = clamp(Math.round(width * 0.26), 88, 114);
    const cardMediaHeight = clamp(Math.round(width * 0.48), 168, 206);

    return {
      width,
      fontScale,
      horizontalPadding,
      gap,
      columns,
      itemWidth,
      isCompact: width < 390,
      heroPadding,
      heroMinHeight,
      heroGlowLargeSize,
      heroGlowSmallSize,
      cardMediaHeight,
    };
  }, [fontScale, gap, horizontalPadding, minTwoColumnWidth, width]);
}
