import { Injectable } from '@nestjs/common';
import { ApprovalRepository } from './approval.repository';
import { CreateApprovalInput, UpdateApprovalStatusInput } from './dtos/approval.dto';
import { Approval } from './entities/approval.entity';

@Injectable()
export class ApprovalService {
  constructor(private readonly approvalRepository: ApprovalRepository) {}

  async createApproval(input: CreateApprovalInput): Promise<Approval> {
    return this.approvalRepository.createApproval(input);
  }

  async updateApprovalStatus(input: UpdateApprovalStatusInput): Promise<Approval> {
    return this.approvalRepository.updateApprovalStatus(input);
  }

  async findAll(): Promise<Approval[]> {
    return this.approvalRepository.find();
  }

  async findByWorkflowAndNode(workflowId: string, nodeId: string): Promise<Approval | null> {
    return this.approvalRepository.findByWorkflowAndNode(workflowId, nodeId);
  }
}