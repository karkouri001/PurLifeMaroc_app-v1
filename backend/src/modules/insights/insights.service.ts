import { Injectable } from '@nestjs/common';
import { ContentService } from '../content/content.service';
import { PrismaService } from '../../prisma/prisma.service';
import { InsightsResponseDto } from './dto/insights-response.dto';

@Injectable()
export class InsightsService {
  constructor(
    private readonly contentService: ContentService,
    private readonly prisma: PrismaService
  ) {}

  async getInsights(): Promise<InsightsResponseDto> {
    const [
      destinations,
      activities,
      accommodations,
      restaurants,
      travelStyles,
      itineraries,
      drivers,
    ] = await Promise.all([
      this.contentService.getDestinations(),
      this.contentService.getActivities(),
      this.contentService.getAccommodations(),
      this.contentService.getRestaurants(),
      this.contentService.getTravelStyles(),
      this.contentService.getItineraries(),
      this.contentService.getDrivers(),
    ]);

    let enquiriesCount = 0;

    try {
      enquiriesCount = await this.prisma.enquiry.count();
    } catch {
      enquiriesCount = 0;
    }

    return {
      contentSource: this.contentService.getCurrentSource(),
      destinationsCount: destinations.length,
      activitiesCount: activities.length,
      accommodationsCount: accommodations.length,
      restaurantsCount: restaurants.length,
      travelStylesCount: travelStyles.length,
      itinerariesCount: itineraries.length,
      driversCount: drivers.length,
      enquiriesCount,
    };
  }
}
