import { registerEnumType } from '@nestjs/graphql';

export enum ProductStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
});

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

registerEnumType(ApprovalStatus, {
  name: 'ApprovalStatus',
});