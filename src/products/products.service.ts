import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data: createProductDto });
  }

  findAll(queryParams: { [key: string]: string }) {
    const query = {};
    if (queryParams['categories']) {
      const categories = queryParams['categories'].split(',').map((id) => +id);
      query['where'] = { categoryId: { in: categories } };
    }

    if (queryParams['product_name']) {
      const keyword = queryParams['product_name'];
      query['where'] = {
        ...query['where'],
        name: { contains: keyword, mode: 'insensitive' },
      };
    }

    return this.prisma.product.findMany({
      where: query['where'],
      include: {
        productImages: true,
        reviews: true,
        productAttributes: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { productImages: true, reviews: true, productAttributes: true },
    });
  }

  update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      data: updateProductDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
