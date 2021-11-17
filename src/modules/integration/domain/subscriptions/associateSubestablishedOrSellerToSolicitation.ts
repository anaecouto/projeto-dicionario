import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ISetInvolvedSolicitationEvent } from 'src/shared/core/interfaces/setInvolvedSolicitationEvent.interface';
import { SetSolicitationInvolvedUseCase } from '../../useCases/solicitation/setSolicitationInvolvedUseCase';
// Um subscriber pode conhecer outro dominio, mas apenas o minimo para conseguir executar um evento
// o subscriber pode chamar um "use case" para resolver uma regra de negócio
@Injectable()
export default class AssociateSubestablishedOrSellerToSolicitation {
  constructor(
    private  setSolicitationInvolvedUseCase: SetSolicitationInvolvedUseCase
  ) {
  }

  @OnEvent('solicitation.setinvolved')
  onStudentEnrolled(payload: ISetInvolvedSolicitationEvent) {
    this.setSolicitationInvolvedUseCase.execute(payload);
  }
}
