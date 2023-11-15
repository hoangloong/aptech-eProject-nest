import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

export interface CreateProduct {
  product: Prisma.ProductCreateInput;
  attributes: Prisma.ProductAttributeCreateManyInput[];
  imgs: Prisma.ProductImageCreateManyInput[];
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productsService.create(createProductDto);
  }

  @Post('/bulk-create')
  bulkCreate(
    @Body()
    createProductDto: CreateProduct,
    @Res() res: Response,
  ) {
    return res.status(HttpStatus.CREATED).send({
      httpStatusCode: HttpStatus.CREATED,
      mesage: this.productsService.createMany(createProductDto),
    });
  }

  @Get()
  findAll(@Query() query) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post('/deal-of-week')
  getDeal() {
    return this.productsService.findDealOfWeek();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
