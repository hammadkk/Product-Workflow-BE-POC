// approval.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductStatus } from '../../common/enum';


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

  @Field(() => ProductStatus)
  @Column({ 
    type: 'enum', 
    enum: ProductStatus, 
    default: ProductStatus.PENDING 
  })
  approvalStatus: ProductStatus; 

  @Field(() => [[String]], { nullable: true }) 
  @Column({ type: 'jsonb', nullable: true })
  decisions: [string, string][]; 


}