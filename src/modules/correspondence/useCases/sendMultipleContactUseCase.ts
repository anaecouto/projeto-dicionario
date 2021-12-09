import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "eventemitter2";
import { ContractStatusEnum } from "src/shared/core/enums/contractStatusEnum";
import { IUseCase } from "src/shared/core/IUseCase";
import { ContractRepoTypeOrm } from "../repositories/implementations/ContractRepoTypeOrm";

@Injectable()
export class SendMultipleContactUseCase implements IUseCase<any, any> {
  constructor(
    @Inject(ContractRepoTypeOrm) private contractRepo: ContractRepoTypeOrm,
    private eventEmitter: EventEmitter2
  ) {}

  async execute(): Promise<any> {
    const data = await this.contractRepo.findAll({
      order: {
        createdAt: -1,
      },
      where: {
        status: ContractStatusEnum.READY,
      },
      take: 10
    });

    this.eventEmitter.emit("send.multiple.contacts", data);
  }
}
