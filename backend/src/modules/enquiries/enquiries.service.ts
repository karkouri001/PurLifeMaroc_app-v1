import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { EnquiryResponseDto } from './dto/enquiry-response.dto';

type EnquiryRecord = Omit<EnquiryResponseDto, 'destinations'> & {
  destinations: unknown;
};

@Injectable()
export class EnquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findRecent(limit: number): Promise<EnquiryResponseDto[]> {
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const enquiries = await this.prisma.enquiry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: safeLimit,
    });

    return enquiries.map((enquiry: EnquiryRecord) => this.mapEnquiry(enquiry));
  }

  async createEnquiry(dto: CreateEnquiryDto): Promise<EnquiryResponseDto> {
    const enquiry = await this.prisma.enquiry.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        travelStyle: dto.travelStyle,
        destinations: dto.destinations,
        startDate: dto.startDate,
        duration: dto.duration,
        budget: dto.budget,
        specialRequests: dto.specialRequests,
      },
    });

    return this.mapEnquiry(enquiry);
  }

  async findById(id: string): Promise<EnquiryResponseDto> {
    const enquiry = await this.prisma.enquiry.findUnique({
      where: { id },
    });

    if (!enquiry) {
      throw new NotFoundException(`Enquiry ${id} not found`);
    }

    return this.mapEnquiry(enquiry);
  }

  private mapEnquiry(enquiry: EnquiryRecord): EnquiryResponseDto {
    return {
      ...enquiry,
      destinations: enquiry.destinations as string[],
    };
  }
}
