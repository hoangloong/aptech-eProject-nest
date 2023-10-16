import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(category: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data: { ...category } });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(uniqInput: number) {
    return this.prisma.category.findUnique({ where: { id: uniqInput } });
  }

  update(id: number, category: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({
      data: { ...category },
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
