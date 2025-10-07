import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import {
  CreateProductInput,
  UpdateProductDetailsInput,
  UpdateProductStatusInput,
} from './dtos/product.dto';
import { Product } from './entities/product.entity';
import { ProductStatus } from '../common/enum';
import axios from 'axios';

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
      // trigger workflow with existing product
      await this.triggerWorkflowForProduct(existing, true);
      return existing;
    }

    const product =
      await this.productRepository.createNewProduct(createProductInput);

    // trigger workflow with new product
    await this.triggerWorkflowForProduct(product, false);
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

  async triggerWorkflowForProduct(product: Product, isProductKnown: boolean) {
    const isRejected = product.status === ProductStatus.REJECTED;

    const isProductRejected = isRejected;

    const webhookUrl =
      'http://localhost:4100/workflow-engine/api/webhook/835ef87b-edfd-48f0-a4e3-a639d25f9e5a';

    const payload = {
      product: {
        name: product.name,
        MFR: product.mfr,
        description: product.description,
        price: product.price,
        SKU: product.sku,
      },
      isProductKnown,
      isProductRejected,
    };

    try {
      const response = await axios.post(webhookUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Webhook triggered successfully:', response.data);
    } catch (error) {
      console.error('Failed to trigger webhook:', error.message);
    }
  }
}
