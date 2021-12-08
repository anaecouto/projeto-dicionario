import { Inject, Injectable } from "@nestjs/common";
import { ObjectID } from "mongodb";
import { ContractStatusEnum } from "src/shared/core/enums/contractStatusEnum";
import { UpdateContratDetailsPayload } from "src/shared/core/interfaces/updateContractDetailsPayload";
import { IUseCase } from "src/shared/core/IUseCase";
import { ContractRepoTypeOrm } from "../repositories/implementations/ContractRepoTypeOrm";

@Injectable()
export class SaveContractDetailsUseCse
  implements IUseCase<any, any>
{
  constructor(
    @Inject(ContractRepoTypeOrm) private contractRepo: ContractRepoTypeOrm,
  ) {
  }

  async execute(payload: UpdateContratDetailsPayload): Promise<any> {
    if (payload) {
      const foundContract = await this.contractRepo.findOne({
        where: {
          _id: new ObjectID(payload.contractId)
        },
      });
      if(foundContract) {
        await this.contractRepo.update(foundContract?._id, {
          ...foundContract,
          details: payload.details,
          status: payload.status
        });
      }
    }
   
  }
}
