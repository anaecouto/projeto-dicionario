import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "eventemitter2";
import { BaseUseCase } from "src/shared/core/baseUseCase";
import { ContractStatusEnum } from "src/shared/core/enums/contractStatusEnum";
import { IContract } from "src/shared/core/interfaces/contract.interface";
import { IUseCase } from "src/shared/core/IUseCase";
import { ContractEntity } from "src/shared/infra/database/typeorm/entities/contract.entity";
import { CreateNewContractValidation } from "../controllers/contract/validations/createNewContract.validation";
import { Contract } from "../domain/contract/Contract";
import { ContractMapper } from "../mappers/ContractMap";
import { ContractRepoTypeOrm } from "../repositories/implementations/ContractRepoTypeOrm";

@Injectable()
export class CreateMultipleContractUseCase
  extends BaseUseCase<ContractEntity>
  implements IUseCase<any, any>
{
  constructor(
    @Inject(ContractRepoTypeOrm) private contractRepo: ContractRepoTypeOrm,
    private eventEmitter: EventEmitter2
  ) {
    super(contractRepo);
  }

  async execute(payload: CreateNewContractValidation[]): Promise<IContract[]> {
    let contracts: IContract[] = [];
    if (payload && payload.length > 0) {
      const contractList = await this.createContractDomainList(payload);
      contracts = await this.saveAllContracts(contractList);
      // contracts = await this.contractRepo.saveAll(contractList);
      this.emitQueueEvent(contracts);
    }
    return contracts;
  }

  private async saveAllContracts(contractList: Contract[]): Promise<IContract[]> {
    // let list = await Promise.all(contractList.map(async (contract) => {
    //   try {
    //     return await this.contractRepo.save(contract);
    //   } catch(err) {
    //     console.error('Erro ao salvar contrato: ', err);
    //   }
    // }));
    // const result = list.filter(a => a) as Contract[];
    return contractList.map(contract => ContractMapper.toInterface(contract));
  }

  private async createContractDomainList(
    payload: CreateNewContractValidation[]
  ) {
    const contractList = await Promise.all(
      payload.map(async (contract) => {
        return Contract.create(
          { ...contract, status: ContractStatusEnum.CREATED },
          undefined,
          false
        );
      })
    );

    return contractList;
  }

  private emitQueueEvent(contractList: IContract[]) {
    this.eventEmitter.emit("push.multiple.contracts.on.queue", contractList);
  }
}
