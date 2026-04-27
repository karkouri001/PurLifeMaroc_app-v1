import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EnquiryResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiPropertyOptional()
  phone?: string | null;

  @ApiPropertyOptional()
  travelStyle?: string | null;

  @ApiProperty({ type: [String] })
  destinations!: string[];

  @ApiPropertyOptional()
  startDate?: string | null;

  @ApiPropertyOptional()
  duration?: string | null;

  @ApiPropertyOptional()
  budget?: string | null;

  @ApiProperty()
  specialRequests!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  source!: string;

  @ApiProperty()
  createdAt!: Date;
}
