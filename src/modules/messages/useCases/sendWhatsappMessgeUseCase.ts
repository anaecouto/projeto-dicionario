import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/shared/core/IUseCase';
import { TwilioProvider } from '../providers/implementation/twilio.provider';

@Injectable()
export class SendWhatsappMessagesUseCase
  implements
    IUseCase<any, any> {
  constructor(    @Inject(TwilioProvider)
  private provider: TwilioProvider) {}

  async execute(
    request: any,
  ): Promise<any> {
    const result = await this.provider.sendSMS();
    return null;
  }
}
