import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductStatus } from 'src/common/enum';
import {
  UpdateProductDetailsInput,
  UpdateProductStatusInput,
} from './dtos/product.dto';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {
    super(Product, repo.manager);
  }

  async findBySKU(sku: string): Promise<Product | null> {
    return this.findOne({ where: { sku: sku } });
  }

  async createNewProduct(data: Partial<Product>): Promise<Product> {
    const newProduct = this.create({
      ...data,
      status: ProductStatus.PENDING,
    });
    return this.save(newProduct);
  }

  async updateProductStatus(input: UpdateProductStatusInput): Promise<Product> {
    const product = await this.findBySKU(input.sku);
    if (!product) throw new Error(`Product with SKU ${input.sku} not found`);

    product.status = input.status;
    return this.save(product);
  }

  async updateProductDetails(
    input: UpdateProductDetailsInput,
  ): Promise<Product> {
    const product = await this.findBySKU(input.sku);
    if (!product) throw new Error(`Product with SKU ${input.sku} not found`);

    Object.assign(product, input);
    return this.save(product);
  }
}
