import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { ContractEntity } from "src/shared/infra/database/typeorm/entities/contract.entity";
import { FindManyOptions, FindOneOptions, UpdateResult } from "typeorm";
import { Contract } from "../domain/contract/Contract";

export interface IContractRepo {
    save(contract: Contract): Promise<Contract>;

    saveAll(contractList: Contract[]): Promise<Contract[]>;

    paginate(options: IPaginationOptions, relations: any): Promise<Pagination<ContractEntity>>
    findOne(
      relations: string | FindOneOptions<ContractEntity>
    ): Promise<ContractEntity | undefined>;
  
    findAll(relations: FindManyOptions<ContractEntity>): Promise<ContractEntity[] | undefined>;
  
    update(entityId: string, entity: ContractEntity): Promise<UpdateResult>;
  
    count(relations: FindManyOptions<ContractEntity>): Promise<number>;
}
