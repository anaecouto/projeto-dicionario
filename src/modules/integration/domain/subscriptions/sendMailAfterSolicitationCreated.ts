import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SendEmailAfterSolicitationUseCase } from '../../useCases/solicitation/sendEmailAfterSolicitationUseCase';
import { NewSolicitationEvent } from '../_domainEvents/NewSolicitationEvent';
// Um subscriber pode conhecer outro dominio, mas apenas o minimo para conseguir executar um evento
// o subscriber pode chamar um "use case" para resolver uma regra de negócio
@Injectable()
export default class SenMailAfterSolicitationCreated {
  constructor(
    private sendMailAfterSolicitationUseCase: SendEmailAfterSolicitationUseCase
  ) {}

  @OnEvent('send.mail.after.solicitation')
  onStudentEnrolled(payload: NewSolicitationEvent) {
    console.log('SEND PROVIDER EVENT');
    this.sendMailAfterSolicitationUseCase.execute(payload.solicitation);
  }
}
