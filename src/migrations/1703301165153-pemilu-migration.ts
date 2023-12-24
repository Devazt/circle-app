import { MigrationInterface, QueryRunner } from "typeorm";

export class PemiluMigration1703301165153 implements MigrationInterface {
    name = 'PemiluMigration1703301165153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follow" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, "followingId" integer, CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, "threadId" integer, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "thread" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "image" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, CONSTRAINT "PK_cabc0f3f27d7b1c70cf64623e02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "fullname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "photo_profile" character varying, "bio" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reply" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "image" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, "threadId" integer, CONSTRAINT "PK_94fa9017051b40a71e000a2aff9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_af9f90ce5e8f66f845ebbcc6f15" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_e9f68503556c5d72a161ce38513" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_52e479f76c8fa698540cb792f37" FOREIGN KEY ("threadId") REFERENCES "thread"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "thread" ADD CONSTRAINT "FK_57782d1d6ab602aa9ff43cf30a2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reply" ADD CONSTRAINT "FK_e9886d6d04a19413a2f0aac5d7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reply" ADD CONSTRAINT "FK_9b7de6888ce703f13e4bbfe13b7" FOREIGN KEY ("threadId") REFERENCES "thread"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reply" DROP CONSTRAINT "FK_9b7de6888ce703f13e4bbfe13b7"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP CONSTRAINT "FK_e9886d6d04a19413a2f0aac5d7b"`);
        await queryRunner.query(`ALTER TABLE "thread" DROP CONSTRAINT "FK_57782d1d6ab602aa9ff43cf30a2"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_52e479f76c8fa698540cb792f37"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_e9f68503556c5d72a161ce38513"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_af9f90ce5e8f66f845ebbcc6f15"`);
        await queryRunner.query(`DROP TABLE "reply"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "thread"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "follow"`);
    }

}
