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

  getCurrentSource() {
    return this.configService.get<string>('CONTENT_SOURCE', 'mock');
  }

  getSourceMetadata() {
    const source = this.getCurrentSource();

    return {
      source,
      strategy:
        source === 'wordpress'
          ? 'Content is normalized through the WordPress REST adapter.'
          : 'Content is served from the internal mock provider.',
    };
  }

  getTravelStyles() {
    return this.getProvider().getTravelStyles();
  }

  getDestinations() {
    return this.getProvider().getDestinations();
  }

  getActivities() {
    return this.getProvider().getActivities();
  }

  getAccommodations() {
    return this.getProvider().getAccommodations();
  }

  getRestaurants() {
    return this.getProvider().getRestaurants();
  }

  getDrivers() {
    return this.getProvider().getDrivers();
  }

  getItineraries() {
    return this.getProvider().getItineraries();
  }

  getCompanyProfile() {
    return this.getProvider().getCompanyProfile();
  }
}
