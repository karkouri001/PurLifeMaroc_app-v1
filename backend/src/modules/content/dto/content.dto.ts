import { ApiProperty } from '@nestjs/swagger';

export class TravelStyleDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  nameEn!: string;

  @ApiProperty()
  nameDe!: string;

  @ApiProperty()
  descriptionEn!: string;

  @ApiProperty()
  descriptionDe!: string;

  @ApiProperty()
  icon!: string;

  @ApiProperty()
  color!: string;
}

export class DestinationDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  nameEn!: string;

  @ApiProperty()
  nameDe!: string;

  @ApiProperty()
  descriptionEn!: string;

  @ApiProperty()
  descriptionDe!: string;

  @ApiProperty()
  image!: string;

  @ApiProperty({ type: [String] })
  highlights!: string[];

  @ApiProperty()
  bestSeason!: string;
}

export class ActivityDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  nameEn!: string;

  @ApiProperty()
  nameDe!: string;

  @ApiProperty()
  descriptionEn!: string;

  @ApiProperty()
  descriptionDe!: string;

  @ApiProperty()
  destination!: string;

  @ApiProperty()
  category!: string;

  @ApiProperty()
  image!: string;

  @ApiProperty()
  duration!: string;

  @ApiProperty()
  serviceNote!: string;
}

export class AccommodationDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  nameEn!: string;

  @ApiProperty()
  nameDe!: string;

  @ApiProperty()
  descriptionEn!: string;

  @ApiProperty()
  descriptionDe!: string;

  @ApiProperty()
  destination!: string;

  @ApiProperty()
  category!: string;

  @ApiProperty()
  image!: string;

  @ApiProperty({ type: [String] })
  amenities!: string[];

  @ApiProperty()
  stayStyle!: string;
}

export class RestaurantDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  nameEn!: string;

  @ApiProperty()
  nameDe!: string;

  @ApiProperty()
  descriptionEn!: string;

  @ApiProperty()
  descriptionDe!: string;

  @ApiProperty()
  destination!: string;

  @ApiProperty()
  cuisine!: string;

  @ApiProperty()
  image!: string;

  @ApiProperty({ type: [String] })
  specialties!: string[];

  @ApiProperty()
  atmosphere!: string;
}

export class DriverProfileDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: [String] })
  languages!: string[];

  @ApiProperty()
  baseCity!: string;

  @ApiProperty({ type: [String] })
  specialtiesEn!: string[];

  @ApiProperty({ type: [String] })
  specialtiesDe!: string[];

  @ApiProperty()
  summaryEn!: string;

  @ApiProperty()
  summaryDe!: string;

  @ApiProperty()
  vehicleEn!: string;

  @ApiProperty()
  vehicleDe!: string;

  @ApiProperty()
  rating!: number;
}

export class SignatureItineraryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  nameEn!: string;

  @ApiProperty()
  nameDe!: string;

  @ApiProperty()
  summaryEn!: string;

  @ApiProperty()
  summaryDe!: string;

  @ApiProperty()
  duration!: string;

  @ApiProperty({ type: [String] })
  destinations!: string[];

  @ApiProperty()
  themeEn!: string;

  @ApiProperty()
  themeDe!: string;
}

export class CompanyProfileDto {
  @ApiProperty()
  brandName!: string;

  @ApiProperty()
  aboutEn!: string;

  @ApiProperty()
  aboutDe!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  phone!: string;
}

export class WebsiteContentDto {
  @ApiProperty({ type: TravelStyleDto, isArray: true })
  travelStyles!: TravelStyleDto[];

  @ApiProperty({ type: DestinationDto, isArray: true })
  destinations!: DestinationDto[];

  @ApiProperty({ type: ActivityDto, isArray: true })
  activities!: ActivityDto[];

  @ApiProperty({ type: AccommodationDto, isArray: true })
  accommodations!: AccommodationDto[];

  @ApiProperty({ type: RestaurantDto, isArray: true })
  restaurants!: RestaurantDto[];

  @ApiProperty({ type: DriverProfileDto, isArray: true })
  drivers!: DriverProfileDto[];

  @ApiProperty({ type: SignatureItineraryDto, isArray: true })
  itineraries!: SignatureItineraryDto[];

  @ApiProperty({ type: CompanyProfileDto })
  companyProfile!: CompanyProfileDto;

  @ApiProperty()
  source!: string;
}
