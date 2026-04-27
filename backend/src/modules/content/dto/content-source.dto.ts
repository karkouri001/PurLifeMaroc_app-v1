import { ApiProperty } from '@nestjs/swagger';

export class ContentSourceDto {
  @ApiProperty()
  source!: string;

  @ApiProperty()
  strategy!: string;
}
