import { Inject, Injectable, Scope } from "@nestjs/common";
import { IUseCase } from "src/shared/core/IUseCase";
import { ISolicitationRepo } from "../../repositories/solicitationRepo.interface";
import { SolicitationRepoTypeOrm } from "../../repositories/implementations/solicitationRepoTypeOrm";
import { ITotalizers } from "src/shared/core/interfaces/totalizers.interface";
import { AnyCnameRecord } from "dns";
import { SolicitationStatusEnum } from "src/shared/core/enums/solicitationStatus.enum";

export class GetTotalizersUseCase
  implements IUseCase<AnyCnameRecord, ITotalizers>
{
  constructor(
    @Inject(SolicitationRepoTypeOrm)
    private solicitationRepo: ISolicitationRepo,
  ) {}

  async execute(): Promise<ITotalizers> {
    const solicitationCount = await this.solicitationRepo.count({});
    const confirmedAmount = await this.solicitationRepo.getSolicitationAmountSumByStatus(SolicitationStatusEnum.APPROVED);
    const pendentAmount = await this.solicitationRepo.getSolicitationAmountSumByStatus(SolicitationStatusEnum.PENDING);
    const liquidatedAmount = await this.solicitationRepo.getSolicitationAmountSumByStatus(SolicitationStatusEnum.LIQUIDATED);
    

    const totalizer = {
      solicitationCount,
      confirmedAmount,
      pendentAmount, 
      generalAmount: confirmedAmount + pendentAmount,
      liquidatedAmount,
    } as ITotalizers;
    return totalizer;
  }

}
