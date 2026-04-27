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
  priceRange!: string;
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
  pricePerNight!: string;
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
  priceRange!: string;
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
