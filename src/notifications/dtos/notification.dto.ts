import { InputType, Field, PartialType, Int, ID } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateNotificationInput {
  @Field()
  @IsInt()
  userId: number;

  @Field()
  @IsInt()
  workflowId: number;

  @Field()
  @IsInt()
  nodeId: number;

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
