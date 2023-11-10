import { Injectable } from '@nestjs/common';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductAttributesService {
  constructor(private prisma: PrismaService) { }
  create(createProductAttributeDtos: Prisma.ProductAttributeCreateManyInput[]) {
    return this.prisma.productAttribute.createMany({ data: createProductAttributeDtos });
  }

  findAll() {
    return `This action returns all productAttributes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productAttribute`;
  }

  update(id: number, updateProductAttributeDto: UpdateProductAttributeDto) {
    return `This action updates a #${id} productAttribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} productAttribute`;
  }
}
