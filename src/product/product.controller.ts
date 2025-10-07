// src/product/product.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductInput,
  UpdateProductStatusInput,
  UpdateProductDetailsInput,
} from './dtos/product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProductInput: CreateProductInput,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductInput);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Put('status')
  async updateStatus(
    @Body() input: UpdateProductStatusInput,
  ): Promise<Product> {
    const updated = await this.productService.updateProductStatus(input);
    if (!updated)
      throw new NotFoundException(`Product with SKU ${input.sku} not found`);
    return updated;
  }

  @Put()
  async updateProductDetails(
    @Body() input: UpdateProductDetailsInput,
  ): Promise<Product> {
    const updated = await this.productService.updateProductDetails(input);
    if (!updated)
      throw new NotFoundException(`Product with SKU ${input.sku} not found`);
    return updated;
  }
}
