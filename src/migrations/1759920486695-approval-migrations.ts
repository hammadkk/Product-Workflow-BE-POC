import { MigrationInterface, QueryRunner } from "typeorm";

export class ApprovalMigrations1759920486695 implements MigrationInterface {
    name = 'ApprovalMigrations1759920486695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "approvals_approvalstatus_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`);
        await queryRunner.query(`CREATE TABLE "approvals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "workflowId" character varying NOT NULL, "nodeId" character varying NOT NULL, "approvalStatus" "approvals_approvalstatus_enum" NOT NULL DEFAULT 'PENDING', "decisions" jsonb, CONSTRAINT "PK_690417aaefa84d18b1a59e2a499" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "approvals"`);
        await queryRunner.query(`DROP TYPE "approvals_approvalstatus_enum"`);
    }

}
