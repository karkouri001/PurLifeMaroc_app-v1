import { ApiProperty } from '@nestjs/swagger';

export class ContentSourceDto {
  @ApiProperty()
  source!: string;

  @ApiProperty()
  wordpressBaseUrl!: string;

  @ApiProperty()
  fallbackSource!: string;

  @ApiProperty()
  strategy!: string;
}
