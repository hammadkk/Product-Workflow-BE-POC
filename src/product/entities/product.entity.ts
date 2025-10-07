import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductStatus } from '../../common/enum';

@Entity('products')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  mfr: string;

  @Column()
  @Field()
  description: string;

  @Column('decimal')
  @Field()
  price: number;

  @Column()
  @Field()
  sku: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.PENDING,
  })
  @Field(() => ProductStatus)
  status: ProductStatus;
}
