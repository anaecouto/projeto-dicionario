import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateNewSolicitationValidation } from '../../controllers/validations/createNewSolicitationValidation';
import { CreateNewSolicitationUseCase } from '../../useCases/solicitation/createNewSolicitationUseCase';
import { SendSolicitationToProviderUseCase } from '../../useCases/solicitation/sendSolicitationToProviderUseCase';
import { NewSolicitationEvent } from '../_domainEvents/NewSolicitationEvent';
// Um subscriber pode conhecer outro dominio, mas apenas o minimo para conseguir executar um evento
// o subscriber pode chamar um "use case" para resolver uma regra de negócio
@Injectable()
export default class AfterSolicitationCreated {
  constructor(
    private sendSolicitationToProviderUseCase: SendSolicitationToProviderUseCase
  ) {}

  @OnEvent('solicitation.newSolicitation')
  onStudentEnrolled(payload: NewSolicitationEvent) {
    console.log('SEND PROVIDER EVENT');
    this.sendSolicitationToProviderUseCase.execute(payload.solicitation);
    // this.sendWelcomeEmail.execute(payload.sender);
  }
}
