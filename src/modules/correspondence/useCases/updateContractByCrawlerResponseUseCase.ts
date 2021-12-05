import { Inject, Injectable } from "@nestjs/common";
import { timingSafeEqual } from "crypto";
import { EventEmitter2 } from "eventemitter2";
import EventEmitterHandler from "src/eventEmitterHandler";
import { BaseUseCase } from "src/shared/core/baseUseCase";
import { ContractStatusEnum } from "src/shared/core/enums/contractStatusEnum";
import { IContract } from "src/shared/core/interfaces/contract.interface";
import { ICrawlerResponseMessage } from "src/shared/core/interfaces/crawlerReponseMessage.interface";
import { IUseCase } from "src/shared/core/IUseCase";
import { ContractEntity } from "src/shared/infra/database/typeorm/entities/contract.entity";
import { ContractRepoTypeOrm } from "../repositories/implementations/ContractRepoTypeOrm";

@Injectable()
export class UpdateContractByCrawlerResponseUseCase
  extends BaseUseCase<ContractEntity>
  implements IUseCase<any, any>
{
  constructor(
    @Inject(ContractRepoTypeOrm) private contractRepo: ContractRepoTypeOrm,
  ) {
    super(contractRepo);
    EventEmitterHandler.getInstance().on('update.contract.crawler.result', payload => {
      this.execute(payload);
  });
  }

  async execute(payload: ICrawlerResponseMessage): Promise<void> {
    if (payload) {
      const foundContract = (await this.contractRepo.findOne({
        where: {
          document: payload.document,
        },
      })) as ContractEntity;
      if (payload.report === "success") {
        await this.contractRepo.update(foundContract?._id, {
          ...foundContract,
          status: payload.crawlerResult.status,
          options: payload.crawlerResult.options,
        });
      } else {
        await this.contractRepo.update(foundContract?._id, {
          ...foundContract,
          status: ContractStatusEnum.ERROR,
          metadata: {
            crawler: {
              status: payload.crawlerResult.status,
              report: payload.crawlerResult.report
            }
          }
        });
      }
    }
  }
}
