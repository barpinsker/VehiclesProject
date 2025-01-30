import { MigrationInterface, QueryRunner } from "typeorm";

export class VehicleMiration1738237779732 implements MigrationInterface {
    name = 'VehicleMiration1738237779732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "licensePlate" character varying(50) NOT NULL, "manufacturer" character varying(100) NOT NULL, "model" character varying(100) NOT NULL, "status" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a654a0355ae4c5ba31c5f6c8925" UNIQUE ("licensePlate"), CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehicle"`);
    }

}
