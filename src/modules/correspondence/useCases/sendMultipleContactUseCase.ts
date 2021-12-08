import { Inject, Injectable } from "@nestjs/common";
import { ContractStatusEnum } from "src/shared/core/enums/contractStatusEnum";
import { IUseCase } from "src/shared/core/IUseCase";
import { ContractRepoTypeOrm } from "../repositories/implementations/ContractRepoTypeOrm";

@Injectable()
export class SendMultipleContactUseCase
  implements IUseCase<any, any>
{
  constructor(
    @Inject(ContractRepoTypeOrm) private contractRepo: ContractRepoTypeOrm,
  ) {
  }

  async execute(payload: any): Promise<any> {
    const data = await this.contractRepo.paginate({
      limit: payload.limit,
      page: 1,
    },
    {
      order: {
        createdAt: -1
    },
      where: {
        status: ContractStatusEnum.READY
      }
    })
  }
}
