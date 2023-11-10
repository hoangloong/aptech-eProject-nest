import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductAttributesService } from './product-attributes.service';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { Prisma } from '@prisma/client';

@Controller('product-attributes')
export class ProductAttributesController {
  constructor(private readonly productAttributesService: ProductAttributesService) { }

  @Post()
  create(@Body() createProductAttributeDto: Prisma.ProductAttributeCreateManyInput[]) {
    return this.productAttributesService.create(createProductAttributeDto);
  }

  @Get()
  findAll() {
    return this.productAttributesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productAttributesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductAttributeDto: UpdateProductAttributeDto) {
    return this.productAttributesService.update(+id, updateProductAttributeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productAttributesService.remove(+id);
  }
}
