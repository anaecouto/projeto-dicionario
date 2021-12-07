import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { IZapi } from 'src/shared/core/interfaces/zapiContact.interface';
import { IUseCase } from 'src/shared/core/IUseCase';
import { ZapiProvider } from '../providers/implementation/zapi.provider';

@Injectable()
export class SendWhatsappMessagesUseCase
  implements
    IUseCase<any, any> {
  constructor(
  @Inject(ZapiProvider)
  private provider: ZapiProvider,
  private eventEmitter: EventEmitter2
  ) {}

  async execute(
    payload: IZapi,
  ): Promise<any> {
    const result = await this.provider.sendWhatsapp(payload.phone, payload.message);
    this.eventEmitter.emit("update.contract.whatsapp.contact", payload);
    return null;
  }
}
