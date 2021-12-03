import { Injectable } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { Contract } from "src/modules/correspondence/domain/contract/Contract";
import { IContract } from "src/shared/core/interfaces/contract.interface";
import { IUseCase } from "src/shared/core/IUseCase";

@Injectable()
export class PushContractsOnQueueUseCase
  implements IUseCase<any, any>
{
  private clientAdminBackend: ClientProxy;
  constructor() {
    // this.clientAdminBackend = ClientProxyFactory.create({
    //   transport: Transport.RMQ,
    //   options: {
    //     urls: ["amqp://user:EZ7DBqXDfPts@18.234.188.5:5672"],
    //     queue: "crawler",
    //     queueOptions: {
    //       durable: false
    //     },
    //   },
    // });
  }

  async execute(contractList: IContract[]): Promise<IContract[]> {
    await Promise.all(
      contractList.map(async contract => {
        // return await this.clientAdminBackend.emit('criar-lead', JSON.stringify(contract));
      })
    )
    return contractList;
  }
}
