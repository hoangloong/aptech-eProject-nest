import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { uniq } from 'lodash';
import * as moment from 'moment';
import { CreateProduct } from './products.controller';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data: { ...createProductDto } });
  }

  async createMany(createProductDto: CreateProduct) {
    const productCreated = await this.prisma.product.create({
      data: createProductDto.product,
    });

    const attributesCreated = await this.prisma.productAttribute.createMany({
      data: createProductDto.attributes.map((e) => ({
        ...e,
        productId: productCreated.id,
      })),
    });

    const imgsCreated = await this.prisma.productImage.createMany({
      data: createProductDto.imgs.map((e) => ({
        ...e,
        productId: productCreated.id,
      })),
    });

    if (productCreated.id && attributesCreated.count && imgsCreated.count) {
      return 'Create product successfully';
    } else return 'Errors';
  }

  async findAll(queryParams: { [key: string]: any }) {
    const query = {};
    if (queryParams['categories']) {
      const categories: number[] = queryParams['categories']
        .split(',')
        .map((id) => +id);
      const categoriesId = await (
        await this.prisma.category.findMany({
          where: { id: { in: categories } },
          include: { categories: true },
        })
      ).flatMap((item) =>
        item.categories.length ? item.categories.map((x) => x.id) : item.id,
      );

      query['where'] = { categoryId: { in: uniq(categoriesId) } };
    }

    if (queryParams['product_name']) {
      const keyword = queryParams['product_name'];
      query['where'] = {
        ...query['where'],
        name: { contains: keyword, mode: 'insensitive' },
      };
    }

    if (queryParams['created_date']) {
      query['orderBy'] = {
        ...query['orderBy'],
        createdDate: queryParams['created_date'],
      };
    }

    const data = await this.prisma.product.findMany({
      where: query['where'],
      orderBy: query['orderBy'],
      include: {
        productImages: true,
        reviews: true,
        productAttributes: true,
      },
      skip: queryParams['paging']
        ? queryParams['paging'] * queryParams['page_size']
        : 1,
      take: parseInt(queryParams['page_size']) || 5,
    });

    const total = await this.prisma.product.count({
      where: query['where'],
    });

    return {
      data,
      total,
    };
  }

  async findDealOfWeek() {
    const endOfWeek = moment()
      .utc()
      .endOf('week')
      .add(1, 'day')
      .endOf('day')
      .toISOString();
    const data = await this.prisma.product.findMany({
      include: {
        productImages: true,
        reviews: true,
        productAttributes: true,
      },
    });
    return {
      data: data.filter((item) =>
        item.productAttributes.every((x) => {
          return (
            x.discountDueDate.toUTCString() ===
            new Date(endOfWeek).toUTCString()
          );
        }),
      ),
    };
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
