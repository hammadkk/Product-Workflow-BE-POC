import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity('notifications')
export class Notification {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Field()
  @Column()
  userId: number;

  @Field()
  @Column()
  workflowId: number;

  @Field()
  @Column()
  nodeId: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column()
  productName: string;

  @Field()
  @Column({ default: false })
  isModified: boolean;
}
