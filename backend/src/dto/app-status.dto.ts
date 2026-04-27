import { ApiProperty } from '@nestjs/swagger';

export class AppStatusDto {
  @ApiProperty()
  status!: string;

  @ApiProperty()
  service!: string;

  @ApiProperty()
  version!: string;

  @ApiProperty()
  contentSource!: string;

  @ApiProperty()
  timestamp!: string;
}
