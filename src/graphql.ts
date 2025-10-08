
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ProductStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export enum ApprovalStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export class CreateProductInput {
    name: string;
    mfr: string;
    description: string;
    price: number;
    sku: string;
    status?: Nullable<ProductStatus>;
}

export class UpdateProductStatusInput {
    sku: string;
    status: ProductStatus;
}

export class UpdateProductDetailsInput {
    sku: string;
    name?: Nullable<string>;
    mfr?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    status?: Nullable<ProductStatus>;
}

export class CreateNotificationInput {
    userId: string;
    workflowId: string;
    nodeId: string;
    description?: Nullable<string>;
    productName: string;
    isModified: boolean;
}

export class UpdateNotificationInput {
    id: string;
    isModified?: Nullable<boolean>;
}

export class CreateApprovalInput {
    workflowId: string;
    nodeId: string;
    approvalStatus?: Nullable<ApprovalStatus>;
    decisions?: Nullable<JSONObject>;
}

export class UpdateApprovalStatusInput {
    id: string;
    approvalStatus: ApprovalStatus;
    decisions?: Nullable<JSONObject>;
}

export class Product {
    id: string;
    name: string;
    mfr: string;
    description: string;
    price: number;
    sku: string;
    status: ProductStatus;
}

export class Notification {
    id: string;
    userId: string;
    workflowId: string;
    nodeId: string;
    description?: Nullable<string>;
    productName: string;
    isModified: boolean;
}

export class Approval {
    id: string;
    workflowId: string;
    nodeId: string;
    approvalStatus: ApprovalStatus;
    decisions?: Nullable<JSONObject>;
}

export abstract class IQuery {
    abstract products(): Product[] | Promise<Product[]>;

    abstract notifications(): Notification[] | Promise<Notification[]>;

    abstract notification(id: string): Notification | Promise<Notification>;

    abstract findAllApprovals(): Approval[] | Promise<Approval[]>;

    abstract findApprovalByWorkflowAndNode(workflowId: string, nodeId: string): Nullable<Approval> | Promise<Nullable<Approval>>;
}

export abstract class IMutation {
    abstract createProduct(createProductInput: CreateProductInput): Product | Promise<Product>;

    abstract updateProductStatus(updateProductStatusInput: UpdateProductStatusInput): Product | Promise<Product>;

    abstract updateProductDetails(updateProductDetailsInput: UpdateProductDetailsInput): Product | Promise<Product>;

    abstract createNotification(createNotificationInput: CreateNotificationInput): Notification | Promise<Notification>;

    abstract updateNotification(updateNotificationInput: UpdateNotificationInput): Notification | Promise<Notification>;

    abstract deleteNotification(id: string): boolean | Promise<boolean>;

    abstract createApproval(input: CreateApprovalInput): Approval | Promise<Approval>;

    abstract updateApprovalStatus(input: UpdateApprovalStatusInput): Approval | Promise<Approval>;
}

export type JSONObject = any;
type Nullable<T> = T | null;
