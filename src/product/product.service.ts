import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }
  
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = await this.productModel.create(createProductDto);
    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    console.log(products);
    return products;
  }

  findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ id }).exec();
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productModel.findOneAndUpdate({ id }, updateProductDto, {
      new: true,
    });
  }

  remove(id: number) {
    return this.productModel.deleteOne({ id });
  }
}
