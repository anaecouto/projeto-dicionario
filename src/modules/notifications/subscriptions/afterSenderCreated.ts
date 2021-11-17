import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NewSenderEvent } from 'src/modules/messages/domain/_domainEvents/NewSenderEvent';
import { SendWelcomeEmailUseCase } from '../useCases/sendWelcomeEmail/sendWelcomeEmailUseCase';

// Um subscriber pode conhecer outro dominio, mas apenas o minimo para conseguir executar um evento
// o subscriber pode chamar um "use case" para resolver uma regra de negócio
@Injectable()
export default class AfterSenderCreated {
  constructor(private sendWelcomeEmail: SendWelcomeEmailUseCase) {}

  @OnEvent('sender.newSender')
  onStudentEnrolled(payload: NewSenderEvent) {
    console.info('[SUBSCRIBER DE NOVO SENDER] -', payload);

    this.sendWelcomeEmail.execute(payload.sender);
  }
}
