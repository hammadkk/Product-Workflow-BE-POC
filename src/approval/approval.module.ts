import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Approval } from './entities/approval.entity';
import { ApprovalRepository } from './approval.repository';
import { ApprovalService } from './approval.service';
import { ApprovalController } from './approval.controller';
import { ApprovalResolver } from './approval.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Approval])],
  providers: [ApprovalService, ApprovalRepository,ApprovalResolver],
  controllers: [ApprovalController],
})
export class ApprovalModule {}
