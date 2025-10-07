import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1759841556815 implements MigrationInterface {
  name = 'Migrations1759841556815';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "filter" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "created_by_username" character varying NOT NULL, "updated_by_username" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "filter_json" character varying NOT NULL, "dto" character varying NOT NULL, "context_id" uuid, CONSTRAINT "PK_3c5d89c1607d52ce265c7348f70" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "products_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "mfr" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, "sku" character varying NOT NULL, "status" "products_status_enum" NOT NULL DEFAULT 'PENDING', CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" integer NOT NULL, "workflowId" integer NOT NULL, "nodeId" integer NOT NULL, "description" character varying, "productName" character varying NOT NULL, "isModified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TYPE "products_status_enum"`);
    await queryRunner.query(`DROP TABLE "filter"`);
  }
}
