import React from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { theme } from '../theme/theme';
import type { MapPoint } from '../data/contentDetails';

const NativeWebView = Platform.OS === 'web' ? null : WebView;

type GoogleMapCardProps = {
  title: string;
  subtitle?: string;
  points: MapPoint[];
  mode?: 'place' | 'route';
  height?: number;
  startFromCurrentLocation?: boolean;
  showPointLabels?: boolean;
};

const formatCoordinates = (point: MapPoint) => `${point.latitude},${point.longitude}`;

const buildPlaceQuery = (point: MapPoint) =>
  point.googleQuery || point.address || formatCoordinates(point);

const escapeHtmlAttribute = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const buildPreviewUrl = (points: MapPoint[], mode: 'place' | 'route') => {
  if (mode === 'route' && points.length > 1) {
    const origin = formatCoordinates(points[0]);
    const rest = points.slice(1).map(formatCoordinates).join('+to:');
    return `https://maps.google.com/maps?saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(rest)}&dirflg=d&output=embed`;
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(buildPlaceQuery(points[0]))}&z=13&output=embed`;
};

const buildOpenUrl = (
  points: MapPoint[],
  mode: 'place' | 'route',
  startFromCurrentLocation: boolean
) => {
  if (mode === 'route' && points.length > 1) {
    const destination = formatCoordinates(points[points.length - 1]);
    const stopPoints = startFromCurrentLocation ? points.slice(0, -1) : points.slice(1, -1);
    const middleStops = stopPoints
      .map(formatCoordinates)
      .join('|');
    const origin = startFromCurrentLocation
      ? ''
      : `&origin=${encodeURIComponent(formatCoordinates(points[0]))}`;

    return `https://www.google.com/maps/dir/?api=1${origin}&destination=${encodeURIComponent(destination)}${middleStops ? `&waypoints=${encodeURIComponent(middleStops)}` : ''}&travelmode=driving`;
  }

  const point = points[0];

  if (startFromCurrentLocation) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      buildPlaceQuery(point)
    )}&travelmode=driving`;
  }

  if (point.googleMapsUrl) {
    return point.googleMapsUrl;
  }

  return point.googleQuery || point.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        point.googleQuery || point.address || formatCoordinates(point)
      )}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        formatCoordinates(point)
      )}`;
};

const buildIframeHtml = (previewUrl: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #ffffff;
      }

      iframe {
        border: 0;
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <iframe
      src="${escapeHtmlAttribute(previewUrl)}"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </body>
</html>`;

export function GoogleMapCard({
  title,
  subtitle,
  points,
  mode = 'place',
  height = 210,
  startFromCurrentLocation = mode === 'route',
  showPointLabels = false,
}: GoogleMapCardProps) {
  if (points.length === 0) {
    return null;
  }

  const previewUrl = buildPreviewUrl(points, mode);
  const openUrl = buildOpenUrl(points, mode, startFromCurrentLocation);
  const previewHtml = buildIframeHtml(previewUrl);
  const openLabel = startFromCurrentLocation
    ? 'Open live directions'
    : mode === 'route' && points.length > 1
      ? 'Open route in Google Maps'
      : 'Open in Google Maps';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {NativeWebView ? (
        <View style={[styles.mapWrap, { height }]}>
          <NativeWebView
            originWhitelist={['*']}
            source={{ html: previewHtml }}
            startInLoadingState
            javaScriptEnabled
            domStorageEnabled
            scrollEnabled={false}
            bounces={false}
            nestedScrollEnabled={false}
            setSupportMultipleWindows={false}
            renderLoading={() => (
              <View style={styles.loadingState}>
                <ActivityIndicator size="small" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Loading Google map</Text>
              </View>
            )}
            style={styles.map}
          />

          <TouchableOpacity
            style={styles.mapOverlay}
            activeOpacity={1}
            onPress={() => {
              void Linking.openURL(openUrl);
            }}
          >
            <View style={styles.googleBadge}>
              <Text style={styles.googleBadgeText}>Google</Text>
            </View>
            <View style={styles.overlayButton}>
              <Text style={styles.overlayButtonText}>
                {startFromCurrentLocation ? 'Directions' : 'Open'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.webFallback, { height }]}
          activeOpacity={0.9}
          onPress={() => {
            void Linking.openURL(openUrl);
          }}
        >
          <Text style={styles.webFallbackTitle}>Google map preview</Text>
          <Text style={styles.webFallbackText}>
            Open the real Google Maps preview for this place or route.
          </Text>
        </TouchableOpacity>
      )}

      {showPointLabels ? (
        <View style={styles.pointRow}>
          {points.map((point, index) => (
            <View key={`${point.id}-${index}`} style={styles.pointChip}>
              <Text style={styles.pointChipText}>{point.label}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          void Linking.openURL(openUrl);
        }}
        activeOpacity={0.85}
      >
        <Text style={styles.openButtonText}>{openLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    lineHeight: 21,
  },
  mapWrap: {
    overflow: 'hidden',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceAlt,
    position: 'relative',
    ...theme.shadows.none,
  },
  map: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: 'rgba(10, 10, 10, 0.02)',
  },
  googleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  googleBadgeText: {
    ...theme.typography.caption,
    color: theme.colors.black,
    fontWeight: '700',
  },
  overlayButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.94)',
  },
  overlayButtonText: {
    ...theme.typography.caption,
    color: theme.colors.black,
    fontWeight: '700',
  },
  loadingState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  loadingText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },
  webFallback: {
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceAlt,
    padding: theme.spacing.xl,
    justifyContent: 'center',
    ...theme.shadows.none,
  },
  webFallbackTitle: {
    ...theme.typography.h5,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  webFallbackText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  pointRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.md,
  },
  pointChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceAlt,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  pointChipText: {
    ...theme.typography.caption,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  openButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primaryDark,
    marginTop: theme.spacing.xs,
  },
  openButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.white,
    fontWeight: '700',
  },
});

export default GoogleMapCard;
