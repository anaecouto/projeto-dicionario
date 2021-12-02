import { Inject, Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/shared/core/baseUseCase";
import { IUseCase } from "src/shared/core/IUseCase";
import { ContractEntity } from "src/shared/infra/database/typeorm/entities/contract.entity";
import { CreateNewContractValidation } from "../controllers/validations/createNewContract.validation";
import { Contract } from "../domain/contract/Contract";
import { ContractRepoTypeOrm } from "../repositories/implementations/ContractRepoTypeOrm";

@Injectable()
export class CreateNewContractUseCase
  extends BaseUseCase<ContractEntity>
  implements
    IUseCase<any, any> {
  constructor(@Inject(ContractRepoTypeOrm) private contractRepo: ContractRepoTypeOrm) {
    super(contractRepo);
  }

  async execute(
    payload: CreateNewContractValidation,
  ): Promise<Contract> {
    let contract = Contract.create({...payload, status: 'CREATED'});
    contract = await this.contractRepo.save(contract);
    return contract;
  } 
}
