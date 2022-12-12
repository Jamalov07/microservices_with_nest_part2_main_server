import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('product_created')
  async create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto, 'bu controller');
    const product = await this.productService.create(createProductDto);
    return product;
  }

  @EventPattern('hello')
  async hello(data: string) {
    console.log(data);
  }

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return products;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
  //put
  @EventPattern('product_updated')
  update(@Body() updateProductDto: UpdateProductDto) {
    const { id, ...updateData } = updateProductDto;
    return this.productService.update(+id, updateData);
  }

  // @Delete(':id')
  @EventPattern('product_deleted')
  remove(id: number) {
    return this.productService.remove(+id);
  }
}
