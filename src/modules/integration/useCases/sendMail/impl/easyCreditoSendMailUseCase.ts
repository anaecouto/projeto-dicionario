import { Inject, Injectable } from '@nestjs/common';
import { Solicitation } from 'src/modules/integration/domain/solicitation/Solicitation';
import { AWSMailProvider } from 'src/modules/messages/providers/implementation/awsMail.provider';
import { SolicitationStatusEnum } from 'src/shared/core/enums/solicitationStatus.enum';
import AppError from 'src/shared/core/errors/AppError';
import { ISignUpMatchRequest } from 'src/shared/core/interfaces/signUpMatchRequest';
import S3StorageProvider from 'src/shared/providers/storageProvider/implementations/S3StorageProvider';
import IStorageProvider from 'src/shared/providers/storageProvider/IStorageProvider';
import {IProviderSendMail} from '../providerSendMail.interface';
import {BaseProviderSendMail} from './baseProviderSendMail';


@Injectable()
export class EasyCreditoSendMailUseCase
  extends BaseProviderSendMail
  implements IProviderSendMail{

  constructor(
    @Inject(AWSMailProvider)
    public mailProvider: AWSMailProvider,
    @Inject(S3StorageProvider)
    private storageProvider: IStorageProvider
  ) {
    super(mailProvider);
  }
  
  async sendMail(solicitation: Solicitation): Promise<void> {
    if(solicitation?.status === SolicitationStatusEnum.CREATED) {
      this.statusCreated(
        solicitation,
        this.mailProvider
      )
    } else {
      const actionStatus = {
        CREATED: this.statusCreated,
        PENDING: this.statusPending,
        APPROVED: this.statusApprovedEasy,
        DENIED: this.statusDenied,
        LOST: this.statusLostEasy,
      };
      actionStatus[solicitation.status || ""](solicitation, this.mailProvider);
    }
  }

  private statusCreated(
    solicitation: Solicitation,
    mailProvider: AWSMailProvider
  ) {
    console.log("----------->ENVIANDO EMAIL STATUS APPROVED");
    const signUpMatchRequest = solicitation.metadata as ISignUpMatchRequest;
    const email = solicitation.person?.email;
    if(!email) {
      throw new AppError('Não foi possível enviar email de criação de solicitação EasyCrédito. O campo email não foi definido.', {status: 400})  
    } 
    this.sendMailStatusCreated(email );
    
  }

  private statusPending(
    solicitation: Solicitation,
    mailProvider: AWSMailProvider
  ) {
    console.log("----------->ENVIANDO EMAIL STATUS APPROVED");
    const email = solicitation.person?.email;
    if(!email) {
      throw new AppError('Não foi possível enviar email de criação de solicitação EasyCrédito. O campo email não foi definido.', {status: 400})  
    } 
    const subject = "Solicitação aceita.";
    const text =
      "Olá, sua solicitação foi aprovada com sucesso na EasyCrédito. Fique atento ao email para os próximos passos!";
    if (email) mailProvider.sendMail(email, subject, text);
  }

  private statusApprovedEasy(
    solicitation: Solicitation,
    mailProvider: AWSMailProvider
  ) {
    console.log("----------->ENVIANDO EMAIL STATUS APPROVED")
    const email = solicitation.person?.email;
    if(!email) {
      throw new AppError('Não foi possível enviar email de criação de solicitação EasyCrédito. O campo email não foi definido.', {status: 400})  
    } 
    const subject = "Solicitação aprovada.";
    const text =
        `Parabéns ${solicitation?.person?.name}.
         Sua solicitação foi aprovada, aguarde o contato da empresa responsável, para que a mesma seja concluída.
         Se deseja utilizar mais serviços da BanDigital, acesse https://www.bandigital.com.br/`;
    if (email) mailProvider.sendMail(email, subject, text);
  }

  private statusDenied(solicitation: Solicitation, mailProvider: AWSMailProvider) {
    console.log("----------->ENVIANDO EMAIL STATUS DENIED");
    const email = solicitation.person?.email;
    if(!email) {
      throw new AppError('Não foi possível enviar email de criação de solicitação EasyCrédito. O campo email não foi definido.', {status: 400})  
    } 
    const subject = "Solicitação negada.";
    const text = "Olá, sua solicitação foi negada";
    if (email) mailProvider.sendMail(email, subject, text);
  }

  private statusLostEasy(
      solicitation: Solicitation,
      mailProvider: AWSMailProvider
  ) {
    console.log("----------->ENVIANDO EMAIL STATUS LOST");
    const email = solicitation.person?.email;
    if(!email) {
      throw new AppError('Não foi possível enviar email de criação de solicitação EasyCrédito. O campo email não foi definido.', {status: 400})  
    } 
    const subject = "Solicitação em andamento.";
    const text =
        "Olá, sua solicitação está em andamento na EasyCrédito. Fique atento ao email para os próximos passos!";
    if (email) mailProvider.sendMail(email, subject, text);
  }
}