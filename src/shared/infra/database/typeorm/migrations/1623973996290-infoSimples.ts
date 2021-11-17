import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { CompanyEntity } from "../entities/company.entity";

export class infoSimples1623973996290 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        const company = new CompanyEntity();

        company.key = 'infosimples';
        company.name = 'InfoSimples';
        company.siteUrl = 'https://infosimples.com/';
        company.credentials = {
            baseUrl: 'https://api.infosimples.com/api/v1/detran/',
            token: '1950cb47f5cda4d1e30427e8fb510934Ygp3odzsiYmW81LSY3JM0VxCCHoOa1jchHkLycQi',
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