// approval.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ApprovalStatus } from '../../common/enum';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType() // <-- ADD THIS DECORATOR
@Entity({ name: 'approvals' })
export class Approval {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', nullable: false })
  workflowId: string;

  @Field()
  @Column({ type: 'varchar', nullable: false })
  nodeId: string;

  @Field(() => ApprovalStatus)
  @Column({
    type: 'enum',
    enum: ApprovalStatus,
    default: ApprovalStatus.PENDING,
  })
  approvalStatus: ApprovalStatus;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  decisions?: Record<string, boolean>;
}
