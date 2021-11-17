import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SendContactToProviderUseCase } from '../../useCases/contact/sendContactToProviderUseCase';
import { NewContactEvent } from '../_domainEvents/NewContactEvent';
// Um subscriber pode conhecer outro dominio, mas apenas o minimo para conseguir executar um evento
// o subscriber pode chamar um "use case" para resolver uma regra de negócio
@Injectable()
export default class AfterContactCreated {
  constructor(
    private sendContactToProviderUseCase: SendContactToProviderUseCase
  ) {
  }

  @OnEvent('contact.newContact')
  onStudentEnrolled(payload: NewContactEvent) {
    console.log('SEND PROVIDER EVENT');
    this.sendContactToProviderUseCase.execute(payload.contact);
    // this.sendWelcomeEmail.execute(payload.sender);
  }
}
