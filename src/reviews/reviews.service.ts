import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}
  create(createReviewDto: Prisma.ReviewCreateInput) {
    return this.prisma.review.create({ data: { ...createReviewDto } });
  }
}
