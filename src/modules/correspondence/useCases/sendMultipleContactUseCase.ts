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
      take: 5
    });

    const filteredData = data?.filter(element => element.options[0].title !== 'BB RENOVAÇÃO CONSIGNAÇÃO');

    this.eventEmitter.emit("send.multiple.contacts", filteredData);
  }
}
