import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrestayAuthDto } from './dto/prestay-auth.dto';
import { PrestaySessionDto } from './dto/prestay-session.dto';
import { PrestayService } from './prestay.service';

@ApiTags('prestay')
@Controller('prestay')
export class PrestayController {
  constructor(private readonly prestayService: PrestayService) {}

  @Post('auth')
  @ApiOperation({
    summary: 'Authenticate a pre-stay guest against the reservation system',
  })
  @ApiOkResponse({ type: PrestaySessionDto })
  authenticate(@Body() input: PrestayAuthDto) {
    return this.prestayService.authenticate(input);
  }
}
