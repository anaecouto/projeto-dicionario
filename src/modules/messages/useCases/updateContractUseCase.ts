import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { ContractRepoTypeOrm } from 'src/modules/correspondence/repositories/implementations/ContractRepoTypeOrm';
import { ICrawlerResponseMessage } from 'src/shared/core/interfaces/crawlerReponseMessage.interface';
import { IUseCase } from 'src/shared/core/IUseCase';
import { ICreateNewMessagesRequestDTO, ICreateNewMessagesResponseDTO } from '../dtos/createNewMessagesDTO';


@Injectable()
export class UpdateContractUseCase
  implements
    IUseCase<any, any> {
  constructor(@Inject(ContractRepoTypeOrm) private contractRepo: ContractRepoTypeOrm,
  private eventEmitter: EventEmitter2) {}

  async execute(
    request: ICrawlerResponseMessage | undefined,
  ): Promise<void> {

    console.log('Chegou!!!!');
    
  }
}
