import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductInput, UpdateProductDetailsInput, UpdateProductStatusInput } from './dtos/product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(createProductInput: CreateProductInput): Promise<Product> {
    const existing = await this.productRepository.findBySKU(createProductInput.sku);

    if (existing) {
      return this.productRepository.markExistingProductFlags(existing);
    }

    return this.productRepository.createNewProduct(createProductInput);
  }

  async updateProductStatus(input: UpdateProductStatusInput): Promise<Product> {
    return this.productRepository.updateProductStatus(input);
  }

  async updateProductDetails(input: UpdateProductDetailsInput): Promise<Product> {
    return this.productRepository.updateProductDetails(input);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
