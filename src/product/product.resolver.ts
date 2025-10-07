import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput, UpdateProductDetailsInput, UpdateProductStatusInput } from './dtos/product.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
    return await this.productService.createProduct(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Mutation(() => Product)
  async updateProductStatus(@Args('updateProductStatusInput') input: UpdateProductStatusInput): Promise<Product> {
    return this.productService.updateProductStatus(input);
  }

  @Mutation(() => Product)
  async updateProductDetails(@Args('updateProductDetailsInput') input: UpdateProductDetailsInput): Promise<Product> {
    return this.productService.updateProductDetails(input);
  }

  
}