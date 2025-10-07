import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity('notifications')
export class Notification {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  userId: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  workflowId: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  nodeId: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'varchar', length: 255 })
  description: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  productName: string;

  @Field()
  @Column({ default: false })
  isModified: boolean;
}
