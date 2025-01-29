import { MigrationInterface, QueryRunner } from "typeorm";

export class VehicleMigration1738183221638 implements MigrationInterface {
    name = 'VehicleMigration1738183221638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicleDB" ("id" SERIAL NOT NULL, "licensePlate" character varying(50) NOT NULL, "manufacturer" character varying(100) NOT NULL, "model" character varying(100) NOT NULL, "status" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f7d6a9dc861c4a8d01bda01f1bd" UNIQUE ("licensePlate"), CONSTRAINT "PK_ac8ae02e04bbcc7a502381130f5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehicleDB"`);
    }

}
