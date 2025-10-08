import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Approval } from './entities/approval.entity';
import { CreateApprovalInput, UpdateApprovalStatusInput } from './dtos/approval.dto'; 
import { ProductStatus } from 'src/common/enum';

@Injectable()
export class ApprovalRepository extends Repository<Approval> {
  constructor(
    @InjectRepository(Approval)
    private readonly repo: Repository<Approval>,
  ) {
    super(Approval, repo.manager);
  }

  async createApproval(input: CreateApprovalInput): Promise<Approval> {
    const approval = this.create({
      workflowId: input.workflowId,
      nodeId: input.nodeId,
      approvalStatus: input.approvalStatus || ProductStatus.PENDING,
      decisions: input.decisions || [],
    });
    return this.save(approval);
  }

  async updateApprovalStatus(input: UpdateApprovalStatusInput): Promise<Approval> {

    const approval = await this.findOne({ where: { id: input.id } });
    
    if (!approval) {
      throw new Error(`Approval with ID ${input.id} not found`);
    }

    approval.approvalStatus = input.approvalStatus;
    
    if (input.decisions) {
      approval.decisions = input.decisions;
    }

    return this.save(approval);
  }

  async findByWorkflowAndNode(workflowId: string, nodeId: string): Promise<Approval | null> {
    return this.findOne({ where: { workflowId, nodeId } });
  }
}