import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { CompanyEntity } from "../entities/company.entity";

export class nexoos1623713723076 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        const company = new CompanyEntity();

        company.key = 'nexoos';
        company.name = 'Nexoos';
        company.siteUrl = 'https://www.nexoos.com.br';
        company.credentials = {
            baseUrl: 'http://qa.nexoos.com.br/partners_api/v1/',
            token: '1950cb47f5cda4d1e30427e8fb510934',
            username: '',
            password: ''
        }
        company.createdAt = new Date();
        company.updatedAt = new Date();
        await queryRunner.insertOne('companies', company);
    }

    public async down(queryRunner: MongoQueryRunner): Promise<void> {
        await queryRunner.findOneAndDelete('companies', {
            key: 'nexoos',
          });
    }
}
