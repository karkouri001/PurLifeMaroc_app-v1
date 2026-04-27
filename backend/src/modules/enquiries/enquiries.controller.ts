import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { EnquiryResponseDto } from './dto/enquiry-response.dto';
import { EnquiriesService } from './enquiries.service';

@ApiTags('enquiries')
@Controller('enquiries')
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Get()
  @ApiOperation({ summary: 'List recent travel enquiries' })
  @ApiOkResponse({ type: EnquiryResponseDto, isArray: true })
  findRecent(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
  ) {
    return this.enquiriesService.findRecent(limit);
  }

  @Post()
  @ApiOperation({ summary: 'Create a travel enquiry' })
  @ApiCreatedResponse({ type: EnquiryResponseDto })
  create(@Body() body: CreateEnquiryDto) {
    return this.enquiriesService.createEnquiry(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an enquiry by id' })
  @ApiOkResponse({ type: EnquiryResponseDto })
  findOne(@Param('id') id: string) {
    return this.enquiriesService.findById(id);
  }
}
