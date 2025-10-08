import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ApprovalService } from './approval.service';
import { CreateApprovalInput, UpdateApprovalStatusInput } from './dtos/approval.dto';
import { Approval } from './entities/approval.entity';

@Resolver(() => Approval)
export class ApprovalResolver {
  constructor(private readonly approvalService: ApprovalService) {}

  @Mutation(() => Approval)
  async createApproval(
    @Args('input') input: CreateApprovalInput,
  ): Promise<Approval> {
    return this.approvalService.createApproval(input);
  }

  @Mutation(() => Approval)
  async updateApprovalStatus(
    @Args('input') input: UpdateApprovalStatusInput,
  ): Promise<Approval> {
    return this.approvalService.updateApprovalStatus(input);
  }

  @Query(() => [Approval])
  async findAllApprovals(): Promise<Approval[]> {
    return this.approvalService.findAll();
  }

  @Query(() => Approval, { nullable: true })
  async findApprovalByWorkflowAndNode(
    @Args('workflowId', { type: () => String }) workflowId: string,
    @Args('nodeId', { type: () => String }) nodeId: string,
  ): Promise<Approval | null> {
    return this.approvalService.findByWorkflowAndNode(workflowId, nodeId);
  }
}