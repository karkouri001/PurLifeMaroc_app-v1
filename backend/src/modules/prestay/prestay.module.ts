import { Module } from '@nestjs/common';
import { PrestayController } from './prestay.controller';
import { PrestayService } from './prestay.service';

@Module({
  controllers: [PrestayController],
  providers: [PrestayService],
})
export class PrestayModule {}
