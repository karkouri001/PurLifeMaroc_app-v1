import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MockContentProvider } from './providers/mock-content.provider';
import { WordPressContentProvider } from './providers/wordpress-content.provider';
import { ContentProvider } from './providers/content-provider.interface';

@Injectable()
export class ContentService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mockProvider: MockContentProvider,
    private readonly wordpressProvider: WordPressContentProvider
  ) {}

  private getProvider(): ContentProvider {
    const source = this.configService.get<string>('CONTENT_SOURCE', 'mock');
    return source === 'wordpress' ? this.wordpressProvider : this.mockProvider;
  }

  private async getWithFallback<T>(
    read: (provider: ContentProvider) => Promise<T>,
    isEmpty: (value: T) => boolean
  ): Promise<T> {
    const provider = this.getProvider();

    if (provider === this.mockProvider) {
      return read(provider);
    }

    try {
      const value = await read(provider);
      return isEmpty(value) ? read(this.mockProvider) : value;
    } catch {
      return read(this.mockProvider);
    }
  }

  private isEmptyArray<T>(value: T[]): boolean {
    return value.length === 0;
  }

  getCurrentSource() {
    return this.configService.get<string>('CONTENT_SOURCE', 'mock');
  }

  getSourceMetadata() {
    const source = this.getCurrentSource();

    return {
      source,
      wordpressBaseUrl: this.configService.get<string>(
        'WORDPRESS_BASE_URL',
        'https://www.purlife-maroc.com/en'
      ),
      fallbackSource: 'mock',
      strategy:
        source === 'wordpress'
          ? 'Content is normalized through the WordPress REST adapter, with mock fallback if the remote API is unavailable or empty.'
          : 'Content is served from the internal mock provider.',
    };
  }

  getTravelStyles() {
    return this.getWithFallback((provider) => provider.getTravelStyles(), this.isEmptyArray);
  }

  getDestinations() {
    return this.getWithFallback((provider) => provider.getDestinations(), this.isEmptyArray);
  }

  getActivities() {
    return this.getWithFallback((provider) => provider.getActivities(), this.isEmptyArray);
  }

  getAccommodations() {
    return this.getWithFallback((provider) => provider.getAccommodations(), this.isEmptyArray);
  }

  getRestaurants() {
    return this.getWithFallback((provider) => provider.getRestaurants(), this.isEmptyArray);
  }

  getDrivers() {
    return this.getWithFallback((provider) => provider.getDrivers(), this.isEmptyArray);
  }

  getItineraries() {
    return this.getWithFallback((provider) => provider.getItineraries(), this.isEmptyArray);
  }

  getCompanyProfile() {
    return this.getWithFallback(
      (provider) => provider.getCompanyProfile(),
      (value) => !value.aboutEn && !value.aboutDe
    );
  }

  async getWebsiteContent() {
    const [
      travelStyles,
      destinations,
      activities,
      accommodations,
      restaurants,
      drivers,
      itineraries,
      companyProfile,
    ] = await Promise.all([
      this.getTravelStyles(),
      this.getDestinations(),
      this.getActivities(),
      this.getAccommodations(),
      this.getRestaurants(),
      this.getDrivers(),
      this.getItineraries(),
      this.getCompanyProfile(),
    ]);

    return {
      travelStyles,
      destinations,
      activities,
      accommodations,
      restaurants,
      drivers,
      itineraries,
      companyProfile,
      source: this.getCurrentSource(),
    };
  }
}
