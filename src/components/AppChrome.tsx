import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppContext } from '../store/AppContext';
import { theme } from '../theme/theme';

export function useTopSpacing(baseSpacing: number = theme.spacing.lg) {
  const { uiSettings } = useAppContext();
  const insets = useSafeAreaInsets();

  return useMemo(() => {
    if (uiSettings.extendIntoStatusBar) {
      return baseSpacing;
    }

    return insets.top + baseSpacing;
  }, [baseSpacing, insets.top, uiSettings.extendIntoStatusBar]);
}
