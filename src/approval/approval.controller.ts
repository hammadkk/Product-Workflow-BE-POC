import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { CreateApprovalInput, UpdateApprovalStatusInput } from './dtos/approval.dto';

@Controller('approvals')
export class ApprovalController {
  constructor(private readonly approvalService: ApprovalService) {}

  @Post()
  async createApproval(@Body() input: CreateApprovalInput) {
    return this.approvalService.createApproval(input);
  }

  @Put(':id')
  async updateApproval(@Param('id') id: string, @Body() input: UpdateApprovalStatusInput) {
    return this.approvalService.updateApprovalStatus({ ...input, id });
  }

  @Get()
  async findAll() {
    return this.approvalService.findAll();
  }

  @Get(':workflowId/:nodeId')
  async findByWorkflowAndNode(
    @Param('workflowId') workflowId: string,
    @Param('nodeId') nodeId: string,
  ) {
    return this.approvalService.findByWorkflowAndNode(workflowId, nodeId);
  }
}
