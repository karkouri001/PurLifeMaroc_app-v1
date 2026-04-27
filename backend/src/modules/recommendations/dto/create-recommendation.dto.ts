import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateRecommendationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  travelStyle?: string;

  @ApiPropertyOptional({ enum: ['budget', 'mid', 'luxury'] })
  @IsOptional()
  @IsIn(['budget', 'mid', 'luxury'])
  budget?: 'budget' | 'mid' | 'luxury';

  @ApiPropertyOptional({ enum: ['weekend', 'week', 'twoweeks', 'month'] })
  @IsOptional()
  @IsIn(['weekend', 'week', 'twoweeks', 'month'])
  duration?: 'weekend' | 'week' | 'twoweeks' | 'month';

  @ApiProperty({ type: [String], default: [] })
  @IsArray()
  @IsString({ each: true })
  interests!: string[];

  @ApiProperty({ type: [String], default: [] })
  @IsArray()
  @IsString({ each: true })
  preferredDestinations!: string[];

  @ApiPropertyOptional({ enum: ['luxury', 'boutique', 'camp', 'traditional'] })
  @IsOptional()
  @IsIn(['luxury', 'boutique', 'camp', 'traditional'])
  accommodationPreference?: 'luxury' | 'boutique' | 'camp' | 'traditional';
}
