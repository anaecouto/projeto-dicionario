import { Inject, Injectable } from "@nestjs/common";
import { ObjectID } from "mongodb";
import { ContractStatusEnum } from "src/shared/core/enums/contractStatusEnum";
import { IZapi } from "src/shared/core/interfaces/zapiContact.interface";
import { IUseCase } from "src/shared/core/IUseCase";
import { Contract } from "../domain/contract/Contract";
import { ContractMapper } from "../mappers/ContractMap";
import { ContractRepoTypeOrm } from "../repositories/implementations/ContractRepoTypeOrm";

@Injectable()
export class UpdateContractWhatsappUseCase implements IUseCase<any, any>
{
  constructor(
    @Inject(ContractRepoTypeOrm) private contractRepo: ContractRepoTypeOrm,

  ) {
  }

  async execute(payload:  IZapi): Promise<void> {
    const foundContract = await this.contractRepo.findOne({
      where: {
        _id: new ObjectID(payload.contractId) 
      }
    });

    if(foundContract) {
      const contractDomain = ContractMapper.toDomain(foundContract);
      contractDomain.status = ContractStatusEnum.CONTACTED;
      this.setContactedPhone(contractDomain, payload.phone);
      await this.contractRepo.save(contractDomain);     
    }
  }

  private setContactedPhone(contract: Contract, phone: string): void {
    if(contract.contactedPhones && contract.contactedPhones.length > 0){
      contract.contactedPhones.push(phone);
    }
    else{
      contract.contactedPhones = [phone];
    }
  }
}
