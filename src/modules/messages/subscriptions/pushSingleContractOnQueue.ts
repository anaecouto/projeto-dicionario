import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';


// Um subscriber pode conhecer outro dominio, mas apenas o minimo para conseguir executar um evento
// o subscriber pode chamar um "use case" para resolver uma regra de negócio
@Injectable()
export default class PushSingleContractOnQueue {
  constructor() {}

  @OnEvent('push.single.contract.on.queue')
  onStudentEnrolled(payload: PushSingleContractOnQueue) {
    console.info('[SUBSCRIBER DE NOVO SENDER] -', payload);
  }
}
