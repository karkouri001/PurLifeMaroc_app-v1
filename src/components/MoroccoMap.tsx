import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Common';
import { MapPoint } from '../data/contentDetails';
import { theme } from '../theme/theme';

type MoroccoMiniMapProps = {
  title?: string;
  subtitle?: string;
  points: MapPoint[];
  highlightedId?: string;
};

export function MoroccoMiniMap({
  title,
  subtitle,
  points,
  highlightedId,
}: MoroccoMiniMapProps) {
  return (
    <Card>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

      <View style={styles.mapWrap}>
        <View style={styles.mapShape} />
        <View style={styles.mapShapeSecondary} />
        <View style={styles.atlasStripe} />
        <Text style={styles.mapNote}>Illustrative map</Text>

        {points.map((point, index) => {
          const highlighted = point.id === highlightedId;

          return (
            <View
              key={`${point.id}-${index}`}
              style={[
                styles.pointWrap,
                {
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                },
              ]}
            >
              <View
                style={[
                  styles.pointDot,
                  highlighted ? styles.pointDotActive : undefined,
                ]}
              >
                {points.length > 1 ? (
                  <Text style={styles.pointOrder}>{index + 1}</Text>
                ) : null}
              </View>
              <View style={styles.pointLabel}>
                <Text style={styles.pointLabelText}>{point.label}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
    marginBottom: theme.spacing.lg,
  },
  mapWrap: {
    height: 220,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceAlt,
    overflow: 'hidden',
    position: 'relative',
  },
  mapShape: {
    position: 'absolute',
    width: '42%',
    height: '72%',
    backgroundColor: 'rgba(219, 127, 50, 0.12)',
    left: '24%',
    top: '10%',
    borderRadius: 36,
    transform: [{ rotate: '14deg' }],
  },
  mapShapeSecondary: {
    position: 'absolute',
    width: '28%',
    height: '34%',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    left: '38%',
    top: '2%',
    borderRadius: 28,
    transform: [{ rotate: '-8deg' }],
  },
  atlasStripe: {
    position: 'absolute',
    width: '6%',
    height: '46%',
    backgroundColor: 'rgba(219, 127, 50, 0.2)',
    left: '43%',
    top: '24%',
    borderRadius: 10,
    transform: [{ rotate: '22deg' }],
  },
  mapNote: {
    position: 'absolute',
    right: theme.spacing.md,
    bottom: theme.spacing.md,
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  pointWrap: {
    position: 'absolute',
    alignItems: 'center',
  },
  pointDot: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: 4,
    borderRadius: 11,
    backgroundColor: theme.colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  pointDotActive: {
    backgroundColor: theme.colors.primary,
    transform: [{ scale: 1.08 }],
  },
  pointOrder: {
    ...theme.typography.caption,
    color: theme.colors.white,
    fontWeight: '700',
  },
  pointLabel: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: theme.radius.full,
  },
  pointLabelText: {
    ...theme.typography.caption,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
});

export default MoroccoMiniMap;
