import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AccommodationDto,
  ActivityDto,
  CompanyProfileDto,
  DestinationDto,
  DriverProfileDto,
  RestaurantDto,
  SignatureItineraryDto,
  TravelStyleDto,
} from './dto/content.dto';
import { ContentSourceDto } from './dto/content-source.dto';
import { ContentService } from './content.service';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('source')
  @ApiOperation({ summary: 'Get the active content provider source' })
  @ApiOkResponse({ type: ContentSourceDto })
  getSource() {
    return this.contentService.getSourceMetadata();
  }

  @Get('travel-styles')
  @ApiOperation({ summary: 'Get travel styles' })
  @ApiOkResponse({ type: TravelStyleDto, isArray: true })
  getTravelStyles() {
    return this.contentService.getTravelStyles();
  }

  @Get('destinations')
  @ApiOperation({ summary: 'Get destinations' })
  @ApiOkResponse({ type: DestinationDto, isArray: true })
  getDestinations() {
    return this.contentService.getDestinations();
  }

  @Get('activities')
  @ApiOperation({ summary: 'Get activities' })
  @ApiOkResponse({ type: ActivityDto, isArray: true })
  getActivities() {
    return this.contentService.getActivities();
  }

  @Get('accommodations')
  @ApiOperation({ summary: 'Get accommodations' })
  @ApiOkResponse({ type: AccommodationDto, isArray: true })
  getAccommodations() {
    return this.contentService.getAccommodations();
  }

  @Get('restaurants')
  @ApiOperation({ summary: 'Get restaurants' })
  @ApiOkResponse({ type: RestaurantDto, isArray: true })
  getRestaurants() {
    return this.contentService.getRestaurants();
  }

  @Get('drivers')
  @ApiOperation({ summary: 'Get chauffeur profiles' })
  @ApiOkResponse({ type: DriverProfileDto, isArray: true })
  getDrivers() {
    return this.contentService.getDrivers();
  }

  @Get('itineraries')
  @ApiOperation({ summary: 'Get signature itineraries' })
  @ApiOkResponse({ type: SignatureItineraryDto, isArray: true })
  getItineraries() {
    return this.contentService.getItineraries();
  }

  @Get('company-profile')
  @ApiOperation({ summary: 'Get company profile' })
  @ApiOkResponse({ type: CompanyProfileDto })
  getCompanyProfile() {
    return this.contentService.getCompanyProfile();
  }
}
