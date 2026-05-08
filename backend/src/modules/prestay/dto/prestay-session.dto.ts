import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PrestayGuestDto {
  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  email!: string;
}

export class PrestayReservationDto {
  @ApiProperty()
  reference!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  startDate!: string;

  @ApiProperty()
  endDate!: string;

  @ApiProperty()
  durationLabel!: string;

  @ApiProperty({ type: [String] })
  destinations!: string[];

  @ApiProperty()
  travelersLabel!: string;

  @ApiProperty()
  managerName!: string;

  @ApiProperty()
  managerEmail!: string;
}

export class PrestayDayDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  labelEn!: string;

  @ApiProperty()
  labelDe!: string;

  @ApiProperty()
  titleEn!: string;

  @ApiProperty()
  titleDe!: string;

  @ApiProperty()
  textEn!: string;

  @ApiProperty()
  textDe!: string;
}

export class PrestayDocumentDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  type!: string;

  @ApiPropertyOptional()
  url?: string;
}

export class PrestayServiceCardDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  titleEn!: string;

  @ApiProperty()
  titleDe!: string;

  @ApiProperty()
  textEn!: string;

  @ApiProperty()
  textDe!: string;

  @ApiProperty()
  actionEn!: string;

  @ApiProperty()
  actionDe!: string;

  @ApiPropertyOptional()
  route?: string;
}

export class PrestayChecklistItemDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  titleEn!: string;

  @ApiProperty()
  titleDe!: string;

  @ApiProperty()
  textEn!: string;

  @ApiProperty()
  textDe!: string;

  @ApiProperty()
  done!: boolean;
}

export class PrestaySessionDto {
  @ApiProperty()
  token!: string;

  @ApiProperty({ enum: ['ezus', 'mock'] })
  source!: 'ezus' | 'mock';

  @ApiProperty({ enum: ['en', 'de'] })
  language!: 'en' | 'de';

  @ApiProperty({ type: PrestayGuestDto })
  guest!: PrestayGuestDto;

  @ApiProperty({ type: PrestayReservationDto })
  reservation!: PrestayReservationDto;

  @ApiProperty({ type: PrestayDayDto, isArray: true })
  days!: PrestayDayDto[];

  @ApiProperty({ type: PrestayDocumentDto, isArray: true })
  documents!: PrestayDocumentDto[];

  @ApiProperty({ type: PrestayServiceCardDto, isArray: true })
  services!: PrestayServiceCardDto[];

  @ApiProperty({ type: PrestayChecklistItemDto, isArray: true })
  checklist!: PrestayChecklistItemDto[];

  @ApiProperty()
  generatedAt!: string;
}
