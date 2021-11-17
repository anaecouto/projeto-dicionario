import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/shared/infra/database/typeorm/entities/company.entity';
import { Repository } from 'typeorm';
import { Company } from '../../domain/company/Company';
import { CompanyMapper } from '../../mappers/compannyMap';
import { ICompanyRepo } from '../companyRepo.interface';

@Injectable()
export class CompanyRepoTypeOrm implements ICompanyRepo {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyTypeOrmRepo: Repository<CompanyEntity>,
  ) {}

  async save(company: Company): Promise<Company> {
    const companyDb = CompanyMapper.toPersistence(company);
    const companyEntity = await this.companyTypeOrmRepo.save(companyDb);
    return CompanyMapper.toDomain(companyEntity);
  }

  async findAll(): Promise<Company[]> {
    const found = await this.companyTypeOrmRepo.find();

    return found.map((item) => {
      return CompanyMapper.toDomain(item);
    });
  }

  async findById(id: string): Promise<Company> {
    const companyEntity = await this.companyTypeOrmRepo.findOne(id);
    if(companyEntity) 
      return CompanyMapper.toDomain(companyEntity);
    
    return CompanyMapper.toDomain(new CompanyEntity());
  }

  async findByCompanyKey(companyKey: string): Promise<Company | undefined> {
    const companyEntity = await this.companyTypeOrmRepo.findOne({key: companyKey});
    if(companyEntity) 
      return CompanyMapper.toDomain(companyEntity);

    return undefined;
  }
}
