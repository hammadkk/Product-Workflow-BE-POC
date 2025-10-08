import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsArray, IsOptional, IsEnum } from 'class-validator';
import { ProductStatus } from 'src/common/enum';

@InputType()
export class CreateApprovalInput {
  @Field()
  @IsString()
  workflowId: string;

  @Field()
  @IsString()
  nodeId: string;

  @Field(() => ProductStatus, { nullable: true, defaultValue: ProductStatus.PENDING })
  @IsOptional()
  @IsEnum(ProductStatus) 
  approvalStatus?: ProductStatus; 

  @Field(() => [[String]], { nullable: true })
  @IsOptional()
  @IsArray()
  decisions?: [string, string][];
}

@InputType()
export class UpdateApprovalStatusInput {
  @Field()
  @IsString()
  id: string;

  @Field(() => ProductStatus) 
  @IsEnum(ProductStatus) 
  approvalStatus: ProductStatus; 

  @Field(() => [[String]], { nullable: true })
  @IsOptional()
  @IsArray()
  decisions?: [string, string][];
}