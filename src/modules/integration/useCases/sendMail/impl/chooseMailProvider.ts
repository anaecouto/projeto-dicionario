import { Inject, Injectable } from '@nestjs/common';
import { Solicitation } from 'src/modules/integration/domain/solicitation/Solicitation';
import IChooseMailProvider from '../chooseMailProvider.interface';
import { IProviderSendMail } from '../providerSendMail.interface';
import { BizCapitalSendMailUseCase } from './bizCapitalSendMailUseCase';
import { EasyCreditoSendMailUseCase } from './easyCreditoSendMailUseCase';
import { InfoSimplesSendMailUseCase } from './infoSimplesSendMailUseCase';
import { MultiplikeSendMailUseCase } from './multiplikeSendMailUseCase';
import { NexoosSendMailUseCase } from './nexoosSendMailUseCase';
import { VamosParcelarSendMailUseCase } from './vamosParcelarSendMailUseCase';


@Injectable()
export class ChooseMailProvider implements IChooseMailProvider {
  constructor(
    @Inject(MultiplikeSendMailUseCase)
    private multiplike: IProviderSendMail,
    @Inject(BizCapitalSendMailUseCase)
    private bizCapital: IProviderSendMail,
    @Inject(EasyCreditoSendMailUseCase)
    private easyCredito: IProviderSendMail,
    @Inject(InfoSimplesSendMailUseCase)
    private infoSimples: IProviderSendMail,
    @Inject(NexoosSendMailUseCase)
    private nexoos: IProviderSendMail,
    @Inject(VamosParcelarSendMailUseCase)
    private vamosParcelar: IProviderSendMail    
  ) {}

  chooseProviderToSendMail(
    solicitation: Solicitation
  ): Promise<IProviderSendMail> {
    return this[solicitation.companyKey];
  }
}
