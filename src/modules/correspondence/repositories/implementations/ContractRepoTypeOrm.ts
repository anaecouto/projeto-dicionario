import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/shared/core/base.repository';
import { ContractEntity } from 'src/shared/infra/database/typeorm/entities/contract.entity';
import { MongoRepository } from 'typeorm';
import { Contract } from '../../domain/contract/Contract';
import { ContractMapper } from '../../mappers/ContractMap';
import { IContractRepo } from '../IContractRepo';


@Injectable()
export class ContractRepoTypeOrm extends BaseRepository<ContractEntity> implements IContractRepo {
  constructor(
    @InjectRepository(ContractEntity)
    private contractRepoTypeOrm: MongoRepository<ContractEntity>,
  ) {
    super(contractRepoTypeOrm);
  }

  async save(contract: Contract): Promise<Contract> {
    const contractDb = ContractMapper.toPersistence(contract);
    
    const contractEntity = await this.contractRepoTypeOrm.save(
      this.contractRepoTypeOrm.create(contractDb)
    );
    return ContractMapper.toDomain(contractEntity);
  }


  async saveAll(contractList: Contract[]): Promise<Contract[]> {
    const contractEntityList = await Promise.all(
      contractList.map(async contract => {
        return this.contractRepoTypeOrm.create(ContractMapper.toPersistence(contract));
      })
    );
    const savedList = await this.contractRepoTypeOrm.save(contractEntityList);

    return await Promise.all(savedList.map(async entity => {
      return ContractMapper.toDomain(entity);
    }));
  }
}
