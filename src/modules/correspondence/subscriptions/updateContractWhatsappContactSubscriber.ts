import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IZapi } from 'src/shared/core/interfaces/zapiContact.interface';
import { UpdateContractWhatsappUseCase } from '../useCases/updateContractWhatsappContactUseCase';


// Um subscriber pode conhecer outro dominio, mas apenas o minimo para conseguir executar um evento
// o subscriber pode chamar um "use case" para resolver uma regra de negócio
@Injectable()
export default class UpdateContractWhatsappContactSubscriber {
  constructor(
    private UpdateContractUseCase: UpdateContractWhatsappUseCase
  ) {}

  @OnEvent('update.contract.whatsapp.contact')
  onStudentEnrolled(payload: IZapi) {
    console.info('UPDATE CONTRACT WHATSAPP');
    this.UpdateContractUseCase.execute(payload);
  }
}
