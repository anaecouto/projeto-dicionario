import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PushContractOnQueueEvent } from 'src/modules/correspondence/domain/_domainEvents/PushContractOnQueueEvent';

// Um subscriber pode conhecer outro dominio, mas apenas o minimo para conseguir executar um evento
// o subscriber pode chamar um "use case" para resolver uma regra de negócio
@Injectable()
export default class PushContractOnQueue {
  constructor() {}

  @OnEvent('push.contract.on.queue')
  onStudentEnrolled(payload: PushContractOnQueueEvent) {
    console.info('[SUBSCRIBER DE NOVO SENDER] -', payload);
  }
}
