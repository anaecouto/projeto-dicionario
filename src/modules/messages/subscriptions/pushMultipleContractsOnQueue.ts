import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Contract } from 'src/modules/correspondence/domain/contract/Contract';
import { IContract } from 'src/shared/core/interfaces/contract.interface';
import { PushContractsOnQueueUseCase } from '../useCases/pushContractOnQueueUseCase';


// Um subscriber pode conhecer outro dominio, mas apenas o minimo para conseguir executar um evento
// o subscriber pode chamar um "use case" para resolver uma regra de negócio
@Injectable()
export default class PushMultipleContractOnQueue {
  constructor(
    private pushContractsOnQueueUseCase: PushContractsOnQueueUseCase
  ) {}

  @OnEvent('push.multiple.contracts.on.queue')
  onStudentEnrolled(payload: IContract[]) {
    console.info('PUSH CONTRACTS ON QUEUE EVENT');
    this.pushContractsOnQueueUseCase.execute(payload);
  }
}
