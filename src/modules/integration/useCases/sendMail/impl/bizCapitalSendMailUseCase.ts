import { Inject, Injectable } from "@nestjs/common";
import { Solicitation } from "src/modules/integration/domain/solicitation/Solicitation";
import { AWSMailProvider } from "src/modules/messages/providers/implementation/awsMail.provider";
import { SolicitationStatusEnum } from "src/shared/core/enums/solicitationStatus.enum";
import S3StorageProvider from "src/shared/providers/storageProvider/implementations/S3StorageProvider";
import IStorageProvider from "src/shared/providers/storageProvider/IStorageProvider";
import { IProviderSendMail } from "../providerSendMail.interface";
import { BaseProviderSendMail } from "./baseProviderSendMail";

@Injectable()
export class BizCapitalSendMailUseCase
  extends BaseProviderSendMail
  implements IProviderSendMail
{
  constructor(
    @Inject(AWSMailProvider)
    public mailProvider: AWSMailProvider,
    @Inject(S3StorageProvider)
    private storageProvider: IStorageProvider
  ) {
    super(mailProvider);
  }

  async sendMail(solicitation: Solicitation): Promise<void> {
    if (solicitation) {
      if (solicitation.status === SolicitationStatusEnum.CREATED) {
        this.statusCreatedOrLostBizCapital(solicitation, this.mailProvider);
      } else {
        const actionStatusBiz = {
          PENDING: this.statusPendingBizCapital,
          APPROVED: this.statusApprovedBizCapital,
          DENIED: this.statusDeniedBizCapital,
          COMPLETED: this.statusCompletedBizCapital,
          LOST: this.statusLostBizCapital,
        };
        actionStatusBiz[solicitation.status || ""](
          solicitation,
          this.mailProvider
        );
      }
    }
  }

  private statusCreatedOrLostBizCapital(
    solicitation: Solicitation,
    mailProvider: AWSMailProvider
  ) {
    const bizCapitalLoanRequest =
      solicitation.metadata as IBizCapitalLoanRequest;
    const email = bizCapitalLoanRequest
      ? bizCapitalLoanRequest.borrower.email
      : "";
    this.sendMailStatusCreated(email);
    //não envia nenhum email para status CREATED
  }

  private statusPendingBizCapital(
    solicitation: Solicitation,
    mailProvider: AWSMailProvider
  ) {
    //não envia nenhum email para status CREATED
    console.log("----------->ENVIANDO EMAIL STATUS PENDING");
    const bizCapitalLoanRequest =
      solicitation.metadata as IBizCapitalLoanRequest;
    const email = bizCapitalLoanRequest
      ? bizCapitalLoanRequest.borrower.email
      : "";
    const subject = "Solicitação em andamento BizCapital.";
    const text =
      "Olá, sua solicitação foi criada com sucesso na BanDigital. Fique atento ao email para os próximos passos.";
    if (email) mailProvider.sendMail(email, subject, text);
  }

  private statusApprovedBizCapital(
    solicitation: Solicitation,
    mailProvider: AWSMailProvider
  ) {
    //não envia nenhum email para status CREATED
    console.log("----------->ENVIANDO EMAIL STATUS APPROVED");
    const bizCapitalLoanRequest =
      solicitation.metadata as IBizCapitalLoanRequest;
    const email = bizCapitalLoanRequest
      ? bizCapitalLoanRequest.borrower.email
      : "";
    const subject = "Solicitação aceita BizCapital.";
    const text =
      "Olá, sua solicitação foi aprovada com sucesso na BizCapital. Fique atento ao email para os próximos passos!";
    if (email) mailProvider.sendMail(email, subject, text);
  }

  private statusDeniedBizCapital(
    solicitation: Solicitation,
    mailProvider: AWSMailProvider
  ) {
    console.log("----------->ENVIANDO EMAIL STATUS DENIED");
    const bizCapitalLoanRequest =
      solicitation.metadata as IBizCapitalLoanRequest;
    const email = bizCapitalLoanRequest
      ? bizCapitalLoanRequest.borrower.email
      : "";
    const subject = "Solicitação negada BizCapital.";
    const text =
      "Olá, sua solicitação foi negada pela BizCapital. Fique atento ao email para os próximos passos!";
    if (email) mailProvider.sendMail(email, subject, text);
  }

  private statusCompletedBizCapital(
    solicitation: Solicitation,
    mailProvider: AWSMailProvider
  ) {
    console.log("----------->ENVIANDO EMAIL STATUS COMPLETED");
    const bizCapitalLoanRequest =
      solicitation.metadata as IBizCapitalLoanRequest;
    const email = bizCapitalLoanRequest
      ? bizCapitalLoanRequest.borrower.email
      : "";
    const subject = "Solicitação concluída BizCapital.";
    const text =
      "Olá, sua solicitação foi concluída com sucesso na BizCapital. Fique atento ao email para os próximos passos!";
    if (email) mailProvider.sendMail(email, subject, text);
  }
  
  private statusLostBizCapital(
    solicitation: Solicitation,
    mailProvider: AWSMailProvider
  ) {
    // sem implementação
  }
}
