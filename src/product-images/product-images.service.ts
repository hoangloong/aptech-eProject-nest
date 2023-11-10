import { Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductImagesService {
  constructor(private prisma: PrismaService) { }

  create(createProductImageDtos: Prisma.ProductImageCreateManyInput[]) {
    return this.prisma.productImage.createMany({ data: createProductImageDtos });
  }

  findAll() {
    return `This action returns all productImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productImage`;
  }

  update(id: number, updateProductImageDto: UpdateProductImageDto) {
    return `This action updates a #${id} productImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} productImage`;
  }
}
