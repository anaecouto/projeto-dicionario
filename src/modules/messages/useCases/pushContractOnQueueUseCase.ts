import { Inject, Injectable } from "@nestjs/common";
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
  constructor(@Inject('MASSAGE_SERVICE') private readonly client: ClientProxy) {
  }

  async execute(contractList: IContract[]): Promise<IContract[]> {
    await Promise.all(
      contractList.map(async contract => {
        return await this.client.emit('lbs', JSON.stringify(contract));
        
      })
    )
    return contractList;
  }
}
