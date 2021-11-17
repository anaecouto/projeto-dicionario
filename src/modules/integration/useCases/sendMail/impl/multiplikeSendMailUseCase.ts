import { Inject, Injectable } from "@nestjs/common";
import { GetObjectOutput } from "aws-sdk/clients/s3";
import { Solicitation } from "src/modules/integration/domain/solicitation/Solicitation";
import { AWSMailProvider } from "src/modules/messages/providers/implementation/awsMail.provider";
import { SolicitationStatusEnum } from "src/shared/core/enums/solicitationStatus.enum";
import S3StorageProvider from "src/shared/providers/storageProvider/implementations/S3StorageProvider";
import IStorageProvider from "src/shared/providers/storageProvider/IStorageProvider";
import { IProviderSendMail } from "../providerSendMail.interface";
import { BaseProviderSendMail } from "./baseProviderSendMail";

@Injectable()
export class MultiplikeSendMailUseCase
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
    if (solicitation.status === SolicitationStatusEnum.CREATED) {
      this.statusCreatedOrLostMultiplike(
        solicitation,
        this.mailProvider,
        this.storageProvider
      );
    } else {
      const actionStatus = {
        CREATED: this.statusCreatedOrLostMultiplike,
        PENDING: this.statusPendingMultiplike,
        LOST: this.statusCreatedOrLostMultiplike,
      };
      actionStatus[solicitation.status || ""](
        solicitation,
        this.mailProvider,
        this.storageProvider
      );
    }
  }

  private statusCreatedOrLostMultiplike(
    solicitation: Solicitation,
    mailProvider: AWSMailProvider,
    storageProvider: IStorageProvider
  ) {
    const multiplikeForm: IMultiplikeRequestInterface = solicitation?.metadata;
    if(multiplikeForm?.email) this.sendMailStatusCreated(multiplikeForm?.email);
  }

  private async statusPendingMultiplike(
    solicitation: Solicitation,
    mailProvider: AWSMailProvider,
    storageProvider: IStorageProvider
  ) {
    const files: string[] = solicitation?.metadata?.fileUrls;
    const multiplikeForm: IMultiplikeRequestInterface = solicitation?.metadata;
    let attatchments;
    if (files) {
      attatchments = await Promise.all(
        files.map(async (fileName) => {
          const file: GetObjectOutput | undefined =
            await storageProvider.getObject(fileName);
          return {
            filename: fileName,
            content: file?.Body as Buffer,
          };
        })
      );
    }
    const text = "Email Multiplike";
    const html = await MultiplikeSendMailUseCase.buildMultiplikeHTML(multiplikeForm);
    await mailProvider.sendMailWithAttachment(
      solicitation.person?.email || '',
      "subject",
      text,
      html,
      attatchments
    );
    console.log("ENVIOU EMAIL MULTIPLIKE");
  }

  static async buildMultiplikeHTML(
    multiplikeForm: IMultiplikeRequestInterface
  ): Promise<string> {
    if (multiplikeForm) {
      const style =
        "<!DOCTYPE html> <html> <head> <style> table, th, td { border: 1px solid black; border-collapse: collapse; } th, td { padding: 5px; } th { text-align: left; } </style> </head> <body>";
      let html = style.concat(
        "<p><h1>Documentação para abertura de cadastro: </h1></p>"
      );

      if (multiplikeForm?.fiveBiggestCustomers?.length) {
        const biggestPartners: string[] = await Promise.all(
          multiplikeForm?.fiveBiggestCustomers.map((element) => {
            return "<dd><p><strong>nome:</strong> ".concat(
              element.name,
              "   <strong>telefone:<strong> ",
              element.phone,
              "</p> </dd>\n"
            );
          })
        );
        html = html.concat(
          "<dl> <p><dt><strong> Maiores clientes:</strong></dt>",
          biggestPartners ? biggestPartners.join("") : "Não informado",
          "</p></dl>"
        );
      }

      if (multiplikeForm?.partnersAndSpousesPhones?.length) {
        const partnersAndSpousesPhones: string[] = await Promise.all(
          multiplikeForm.partnersAndSpousesPhones.map((element) => {
            return "<dd><p><strong>nome:</strong> ".concat(
              element.name,
              "   <strong>telefone:<strong> ",
              element.phone,
              "</p> </dd>\n"
            );
          })
        );
        html = html.concat(
          "<dl><p><dt><strong>Contato sócios e cônjuges: </strong> </dt>",
          partnersAndSpousesPhones
            ? partnersAndSpousesPhones.join("")
            : "Não informado",
          "</p></dl>"
        );
      }

      if (multiplikeForm.bankDetails) {
        html = html.concat(
          "<dl><p><dt><strong>Dados bancários:</strong></dt></p>"
        );
        html = html.concat(
          "<p><dd><strong>     agência: </strong> ",
          this.getUninformedFields(multiplikeForm?.bankDetails?.ag),
          "</p> </dd>"
        );
        html = html.concat(
          "<p><dd><strong>     conta: </strong> ",
          this.getUninformedFields(multiplikeForm.bankDetails.cc),
          "</p> </dd>"
        );
        html = html.concat(
          "<p><dd><strong>     tipo de conta: </strong> ",
          this.getUninformedFields(multiplikeForm.bankDetails.type),
          "</p> </dd>"
        );
        html = html.concat(
          "<p><dd><strong>     banco: </strong> ",
          this.getUninformedFields(multiplikeForm.bankDetails.bank),
          "</p> </dd>"
        );
        html = html.concat(
          "<p><dd><strong>     cpf: </strong> ",
          this.getUninformedFields(multiplikeForm.bankDetails.cpf),
          "</p> </dd> </dl>"
        );
      }

      if (multiplikeForm?.form?.length) {
        html = html.concat(
          "<br/> <P><h3>PLANILHA DE ENDIVIDAMENTO EM FACTORINGS, SECURITIZADORAS EFIDCS - INFORMAR TODOS OS PARCEIROS</h3></p>"
        );
        const form: string[] = await Promise.all(
          multiplikeForm.form.map((line) => {
            return "<table style='width:60%'> <tr> <th>Nome do Parceiro</th> <th>Valor limite</th> <th>Valor tomado</th> </tr> <tr> <td>".concat(
              this.getUninformedFields(line.partnerName),
              "</td> <td>",
              this.getUninformedFields(line.limitAmount),
              "</td> <td>",
              this.getUninformedFields(line.takenAmount),
              "</td> </tr></table></body></html>"
            );
          })
        );
        html = html.concat(form.join(""));
      }
      return html;
    }
    return "";
  }

  static getUninformedFields(field: any): string {
    return field ? field : "<i>Não informado.</i>";
  }
}
