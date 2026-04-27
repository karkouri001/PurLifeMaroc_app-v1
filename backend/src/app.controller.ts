import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContentService } from './modules/content/content.service';
import { AppStatusDto } from './dto/app-status.dto';

@ApiTags('system')
@Controller()
export class AppController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  @ApiOperation({ summary: 'Get backend summary information' })
  @ApiOkResponse({ type: AppStatusDto })
  getSummary(): AppStatusDto {
    return {
      status: 'ok',
      service: 'purlife-backend',
      version: '0.1.0',
      contentSource: this.contentService.getCurrentSource(),
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Get backend health status' })
  @ApiOkResponse({ type: AppStatusDto })
  getHealth(): AppStatusDto {
    return {
      status: 'ok',
      service: 'purlife-backend',
      version: '0.1.0',
      contentSource: this.contentService.getCurrentSource(),
      timestamp: new Date().toISOString(),
    };
  }
}
