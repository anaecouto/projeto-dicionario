import { Inject, Injectable } from '@nestjs/common';
import { Solicitation } from 'src/modules/integration/domain/solicitation/Solicitation';
import IChooseMailProvider from '../chooseMailProvider.interface';
import { IProviderSendMail } from '../providerSendMail.interface';



@Injectable()
export class ChooseMailProvider implements IChooseMailProvider {
  constructor() {}

  chooseProviderToSendMail(
    solicitation: Solicitation
  ): Promise<IProviderSendMail> {
    return this[solicitation.companyKey];
  }
}
