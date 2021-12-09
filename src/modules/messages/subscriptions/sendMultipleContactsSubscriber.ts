import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Contract } from 'src/modules/correspondence/domain/contract/Contract';
import { IContract } from 'src/shared/core/interfaces/contract.interface';
import { ContractEntity } from 'src/shared/infra/database/typeorm/entities/contract.entity';
import { PushContractsOnQueueUseCase } from '../useCases/pushContractOnQueueUseCase';
import { SendMultipleWhatsappMessagesUseCase } from '../useCases/sendMultipleWhatsappMessageUseCase';


// Um subscriber pode conhecer outro dominio, mas apenas o minimo para conseguir executar um evento
// o subscriber pode chamar um "use case" para resolver uma regra de negócio
@Injectable()
export default class SendMultipleContactsSubscriber {
  constructor(
    private sendMultipleWhatsappMessagesUseCase: SendMultipleWhatsappMessagesUseCase

  ) {}

  @OnEvent('send.multiple.contacts')
  onStudentEnrolled(payload: ContractEntity[]) {
    this.sendMultipleWhatsappMessagesUseCase.execute(payload);
  }
}
