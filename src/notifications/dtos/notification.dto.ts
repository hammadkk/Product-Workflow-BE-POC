import { InputType, Field, PartialType, Int, ID } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateNotificationInput {
  @Field()
  userId: string;

  @Field()
  workflowId: string;

  @Field()
  nodeId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @IsString()
  productName: string;

  @Field()
  @IsBoolean()
  isModified: boolean;
}

@InputType()
export class CreateNotificationBulkInput {
  @IsArray()
  userIds: string[];

  @Field()
  @IsString()
  workflowId: string;

  @Field()
  @IsString()
  nodeId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @IsString()
  productName: string;

  @Field()
  @IsBoolean()
  isModified: boolean;
}

@InputType()
export class UpdateNotificationInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  isModified?: boolean;
}
