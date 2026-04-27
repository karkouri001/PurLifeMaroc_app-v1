import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';
import { RecommendationsService } from './recommendations.service';

@ApiTags('recommendations')
@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Post()
  @ApiOperation({ summary: 'Generate recommendations from traveler preferences' })
  @ApiOkResponse({ type: RecommendationResponseDto })
  createRecommendation(@Body() body: CreateRecommendationDto) {
    return this.recommendationsService.buildRecommendations(body);
  }
}
