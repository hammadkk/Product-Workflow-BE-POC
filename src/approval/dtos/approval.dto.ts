import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApprovalStatus } from 'src/common/enum';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateApprovalInput {
  @Field()
  @IsString()
  workflowId: string;

  @Field()
  @IsString()
  nodeId: string;

  @Field(() => ApprovalStatus, { nullable: true, defaultValue: ApprovalStatus.PENDING })
  @IsOptional()
  @IsEnum(ApprovalStatus) 
  approvalStatus?: ApprovalStatus; 

  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  decisions?: Record<string, boolean>;
}

@InputType()
export class UpdateApprovalStatusInput {
  @Field()
  @IsString()
  id: string;

  @Field(() => ApprovalStatus) 
  @IsEnum(ApprovalStatus) 
  approvalStatus: ApprovalStatus; 

  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  decisions?: Record<string, boolean>;
}