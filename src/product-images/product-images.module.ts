import { Module } from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { ProductImagesController } from './product-images.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProductImagesController],
  providers: [ProductImagesService, PrismaService],
})
export class ProductImagesModule { }
