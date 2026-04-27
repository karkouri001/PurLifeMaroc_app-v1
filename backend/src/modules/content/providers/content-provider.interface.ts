import {
  AccommodationDto,
  ActivityDto,
  CompanyProfileDto,
  DestinationDto,
  DriverProfileDto,
  RestaurantDto,
  SignatureItineraryDto,
  TravelStyleDto,
} from '../dto/content.dto';

export interface ContentProvider {
  getTravelStyles(): Promise<TravelStyleDto[]>;
  getDestinations(): Promise<DestinationDto[]>;
  getActivities(): Promise<ActivityDto[]>;
  getAccommodations(): Promise<AccommodationDto[]>;
  getRestaurants(): Promise<RestaurantDto[]>;
  getDrivers(): Promise<DriverProfileDto[]>;
  getItineraries(): Promise<SignatureItineraryDto[]>;
  getCompanyProfile(): Promise<CompanyProfileDto>;
}
