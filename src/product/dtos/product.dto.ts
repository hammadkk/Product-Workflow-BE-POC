import { InputType, Field, Float } from '@nestjs/graphql';
import { ProductStatus } from 'src/common/enum';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  mfr: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  sku: string;

  @Field(() => ProductStatus, { nullable: true, defaultValue: ProductStatus.PENDING })
  status?: ProductStatus;
}


@InputType()
export class UpdateProductStatusInput {
  @Field()
  sku: string;

  @Field(() => ProductStatus)
  status: ProductStatus;
}

@InputType()
export class UpdateProductDetailsInput {
  @Field()
  sku: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  mfr?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => ProductStatus, { nullable: true })
  status?: ProductStatus;
}