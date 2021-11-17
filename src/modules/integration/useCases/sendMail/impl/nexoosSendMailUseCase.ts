import { Inject, Injectable } from '@nestjs/common';
import { Solicitation } from 'src/modules/integration/domain/solicitation/Solicitation';
import { AWSMailProvider } from 'src/modules/messages/providers/implementation/awsMail.provider';
import { MailProvider } from 'src/modules/messages/providers/implementation/mail.provider';
import { SolicitationStatusEnum } from 'src/shared/core/enums/solicitationStatus.enum';
import S3StorageProvider from 'src/shared/providers/storageProvider/implementations/S3StorageProvider';
import IStorageProvider from 'src/shared/providers/storageProvider/IStorageProvider';
import { IProviderSendMail } from '../providerSendMail.interface';
import { BaseProviderSendMail } from './baseProviderSendMail';


@Injectable()
export class NexoosSendMailUseCase
  extends BaseProviderSendMail
  implements IProviderSendMail{

  constructor(
    @Inject(AWSMailProvider)
    public mailProvider: AWSMailProvider,
    @Inject(S3StorageProvider)
    private storageProvider: IStorageProvider
  ) {
    super(mailProvider)
  }
  
  async sendMail(solicitation: Solicitation): Promise<void> {
    if (solicitation) {
      if (solicitation.status === SolicitationStatusEnum.CREATED) {
        this.statusCreated(solicitation);
      } else {
        const actionStatusBiz = {
          PENDING: this.statusPending,
          APPROVED: this.statusApproved,
          DENIED: this.statusDenied,
          COMPLETED: this.statusCompleted,
          LOST: this.statusLost,
        };
        actionStatusBiz[solicitation.status || ""](
          solicitation,
          this.mailProvider
        );
      }
    }
  }

  private statusCreated(solicitation: Solicitation) {
    // console.log("----------->ENVIANDO EMAIL STATUS APPROVED");
    // const signUpMatchRequest = solicitation.metadata as ISignUpMatchRequest;
    // const email = signUpMatchRequest ? signUpMatchRequest.email : "";
    this.sendMailStatusCreated('banDigitaldev@gmail.com');
  }

  private statusPending() {

  }
  private statusApproved() {

  }
  private statusDenied() {

  }
  private statusCompleted() {

  }
  private statusLost() {

  }

}