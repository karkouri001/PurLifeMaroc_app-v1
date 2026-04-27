import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InsightsResponseDto } from './dto/insights-response.dto';
import { InsightsService } from './insights.service';

@ApiTags('insights')
@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get()
  @ApiOperation({ summary: 'Get simple API and content metrics' })
  @ApiOkResponse({ type: InsightsResponseDto })
  getInsights() {
    return this.insightsService.getInsights();
  }
}
