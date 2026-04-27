import { ApiProperty } from '@nestjs/swagger';

export class InsightsResponseDto {
  @ApiProperty()
  contentSource!: string;

  @ApiProperty()
  destinationsCount!: number;

  @ApiProperty()
  activitiesCount!: number;

  @ApiProperty()
  accommodationsCount!: number;

  @ApiProperty()
  restaurantsCount!: number;

  @ApiProperty()
  travelStylesCount!: number;

  @ApiProperty()
  itinerariesCount!: number;

  @ApiProperty()
  driversCount!: number;

  @ApiProperty()
  enquiriesCount!: number;
}
