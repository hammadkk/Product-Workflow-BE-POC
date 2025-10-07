import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import {
  CreateProductInput,
  UpdateProductDetailsInput,
  UpdateProductStatusInput,
} from './dtos/product.dto';
import { Product } from './entities/product.entity';
import { triggerWorkflowForProduct } from 'src/common/util';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(
    createProductInput: CreateProductInput,
  ): Promise<Product> {
    const existing = await this.productRepository.findBySKU(
      createProductInput.sku,
    );

    if (existing) {
      const { status, ...rest } = createProductInput;
      // trigger workflow with existing product
      Object.assign(existing, rest);
      await triggerWorkflowForProduct(existing, true);
      return existing;
    }

    const product =
      await this.productRepository.createNewProduct(createProductInput);

    // trigger workflow with new product
    await triggerWorkflowForProduct(product, false);
    return product;
  }

  async updateProductStatus(input: UpdateProductStatusInput): Promise<Product> {
    return this.productRepository.updateProductStatus(input);
  }

  async updateProductDetails(
    input: UpdateProductDetailsInput,
  ): Promise<Product> {
    return this.productRepository.updateProductDetails(input);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
