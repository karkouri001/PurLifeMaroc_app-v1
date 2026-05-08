import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ActivityIndicator,
  Image,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { useResponsiveLayout } from '../theme/responsive';
import { brandAssets } from '../data/imageAssets';
import { useTopSpacing } from './AppChrome';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: theme.radius.lg,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      ...theme.shadows.none,
    };

    const sizes: Record<string, ViewStyle> = {
      small: { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.lg },
      medium: { paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.xl },
      large: { paddingVertical: theme.spacing.lg, paddingHorizontal: theme.spacing.xxl },
    };

    const variants: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: disabled ? theme.colors.gray : theme.colors.primary,
      },
      secondary: {
        backgroundColor: disabled ? theme.colors.lightGray : theme.colors.beige,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: disabled ? theme.colors.gray : theme.colors.primary,
      },
    };

    return {
      ...base,
      ...sizes[size],
      ...variants[variant],
    };
  };

  const getTextStyle = (): TextStyle => {
    const variants: Record<string, TextStyle> = {
      primary: { color: theme.colors.white },
      secondary: { color: theme.colors.primaryDark },
      outline: { color: theme.colors.primary },
    };

    return {
      ...theme.typography.body,
      fontWeight: '600',
      ...variants[variant],
      opacity: disabled ? 0.6 : 1,
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={() => {
        if (!disabled && !loading) {
          onPress();
        }
      }}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : theme.colors.primaryDark} />
      ) : (
        <>
          {icon ? <View style={{ marginRight: theme.spacing.sm }}>{icon}</View> : null}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  variant?: 'default' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
}) => {
  const cardStyle: ViewStyle = {
    backgroundColor:
      variant === 'elevated' ? theme.colors.surface : theme.colors.surfaceAlt,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.none,
  };

  const content = <View style={[cardStyle, style]}>{children}</View>;

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

interface CardMediaProps {
  source: ImageSourcePropType;
  height?: number;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

export const CardMedia: React.FC<CardMediaProps> = ({
  source,
  height,
  style,
  imageStyle,
}) => {
  const layout = useResponsiveLayout();

  return (
    <View style={[styles.cardMediaWrap, style]}>
      <Image
        source={source}
        style={[
          styles.cardMediaImage,
          { height: height ?? layout.cardMediaHeight },
          imageStyle,
        ]}
        resizeMode="cover"
      />
    </View>
  );
};

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  rightIcon?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBackPress,
  rightIcon,
}) => {
  const paddingTop = useTopSpacing(theme.spacing.md);

  return (
    <View style={[styles.headerContainer, { paddingTop }]}>
      <View style={styles.headerContent}>
        {onBackPress ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color={theme.colors.primary} />
          </TouchableOpacity>
        ) : null}
        <Image source={brandAssets.logo} style={styles.headerLogo} resizeMode="contain" />
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerBrand} numberOfLines={1}>
            Pur Life Maroc
          </Text>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.headerSubtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {rightIcon ? <View>{rightIcon}</View> : null}
      </View>
    </View>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onViewAll?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  onViewAll,
}) => {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
        <BirdDivider compact />
      </View>
      {onViewAll ? (
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const BirdMark: React.FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = theme.colors.primary,
}) => {
  const wingStyle = {
    width: size,
    height: Math.max(7, Math.round(size * 0.48)),
    borderTopWidth: 2,
    borderColor: color,
    borderRadius: size,
  };

  return (
    <View style={[styles.birdMark, { width: size * 1.8, height: size }]}>
      <View
        style={[
          styles.birdWing,
          wingStyle,
          { left: 0, transform: [{ rotate: '18deg' }] },
        ]}
      />
      <View
        style={[
          styles.birdWing,
          wingStyle,
          { right: 0, transform: [{ rotate: '-18deg' }] },
        ]}
      />
    </View>
  );
};

export const BirdDivider: React.FC<{ compact?: boolean; color?: string }> = ({
  compact = false,
  color = theme.colors.primary,
}) => {
  return (
    <View style={[styles.birdDivider, compact ? styles.birdDividerCompact : null]}>
      <BirdMark size={compact ? 11 : 15} color={color} />
      <BirdMark size={compact ? 14 : 18} color={color} />
      <BirdMark size={compact ? 11 : 15} color={color} />
    </View>
  );
};

interface BadgeProps {
  label: string;
  color?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, color }) => {
  return (
    <View
      style={{
        backgroundColor: color || theme.colors.primary,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.radius.full,
      }}
    >
      <Text
        style={{
          color: theme.colors.white,
          fontSize: 12,
          fontWeight: '600',
        }}
      >
        {label}
      </Text>
    </View>
  );
};

interface HeroBannerProps {
  eyebrow?: string;
  title: string;
  description: string;
  accent?: string;
  chips?: string[];
  imageSource?: ImageSourcePropType;
  logoSource?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  eyebrow,
  title,
  description,
  accent,
  chips = [],
  imageSource,
  logoSource,
  style,
}) => {
  const layout = useResponsiveLayout();
  const heroStyle = {
    minHeight: layout.heroMinHeight,
    padding: layout.heroPadding,
  };
  const content = (
    <>
      {logoSource ? (
        <View style={styles.heroBrandRow}>
          <Image source={logoSource} style={styles.heroInlineLogo} resizeMode="contain" />
          <Text style={styles.heroBrandText}>Pur Life Maroc</Text>
        </View>
      ) : null}
      {eyebrow ? <Text style={styles.heroEyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.heroTitle}>{title}</Text>
      <Text style={styles.heroDescription}>{description}</Text>
      <BirdDivider />
      {accent ? <Text style={styles.heroAccent}>{accent}</Text> : null}
      {chips.length > 0 ? (
        <View style={styles.chipsRow}>
          {chips.map((chip) => (
            <View key={chip} style={styles.chip}>
              <Text style={styles.chipText}>{chip}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </>
  );

  if (imageSource) {
    return (
      <ImageBackground
        source={imageSource}
        style={[styles.heroBanner, heroStyle, style]}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroImageOverlay} />
        {content}
      </ImageBackground>
    );
  }

  return (
    <View style={[styles.heroBanner, heroStyle, style]}>
      {content}
    </View>
  );
};

export const StatChip: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <View style={styles.statChip}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardMediaWrap: {
    marginTop: -theme.spacing.lg,
    marginHorizontal: -theme.spacing.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceAlt,
  },
  cardMediaImage: {
    width: '100%',
    backgroundColor: theme.colors.surfaceAlt,
  },
  headerContainer: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextWrap: {
    flex: 1,
  },
  headerLogo: {
    width: 52,
    height: 52,
    marginRight: theme.spacing.md,
  },
  backButton: {
    marginRight: theme.spacing.sm,
    width: 34,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBrand: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.display,
    fontWeight: '700',
  },
  headerTitle: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginTop: 1,
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
  },
  sectionSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  birdDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  birdDividerCompact: {
    marginTop: theme.spacing.sm,
    marginBottom: 0,
  },
  birdMark: {
    position: 'relative',
    marginRight: theme.spacing.xs,
  },
  birdWing: {
    position: 'absolute',
    top: 0,
  },
  viewAllText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  heroBanner: {
    overflow: 'hidden',
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surfaceDark,
    justifyContent: 'flex-end',
  },
  heroBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  heroInlineLogo: {
    width: 38,
    height: 38,
    marginRight: theme.spacing.sm,
  },
  heroBrandText: {
    ...theme.typography.caption,
    color: theme.colors.white,
    fontWeight: '700',
  },
  heroEyebrow: {
    ...theme.typography.overline,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  heroTitle: {
    ...theme.typography.h2,
    color: theme.colors.white,
    marginBottom: theme.spacing.sm,
    maxWidth: '100%',
  },
  heroDescription: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.82)',
    maxWidth: '100%',
  },
  heroAccent: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginTop: theme.spacing.md,
    fontWeight: '700',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.lg,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  chipText: {
    ...theme.typography.caption,
    color: theme.colors.white,
  },
  heroImage: {
    borderRadius: theme.radius.xl,
  },
  heroImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
  },
  statChip: {
    flex: 1,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    ...theme.shadows.none,
  },
  statValue: {
    ...theme.typography.h4,
    color: theme.colors.primaryDark,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
});

export default {
  Button,
  Card,
  CardMedia,
  Header,
  SectionHeader,
  Badge,
  HeroBanner,
  StatChip,
  BirdMark,
  BirdDivider,
};
