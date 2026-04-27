import { ApiProperty } from '@nestjs/swagger';
import {
  AccommodationDto,
  ActivityDto,
  DestinationDto,
} from '../../content/dto/content.dto';

export class RecommendationResponseDto {
  @ApiProperty({ type: DestinationDto, isArray: true })
  destinations!: DestinationDto[];

  @ApiProperty({ type: ActivityDto, isArray: true })
  activities!: ActivityDto[];

  @ApiProperty({ type: AccommodationDto, isArray: true })
  accommodation!: AccommodationDto[];

  @ApiProperty()
  explanation!: string;
}
