import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppointment1776995934355 implements MigrationInterface {
    name = 'CreateAppointment1776995934355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ADD "time" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "service" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "status" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "service"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "time"`);
    }

}
