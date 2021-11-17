import { Inject, Injectable } from "@nestjs/common";
import AppError from "src/shared/core/errors/AppError";
import { Solicitation } from "../../domain/solicitation/Solicitation";
import IChooseMailProvider from "../sendMail/chooseMailProvider.interface";
import { ChooseMailProvider } from "../sendMail/impl/chooseMailProvider";
import { IProviderSendMail } from "../sendMail/providerSendMail.interface";
@Injectable()
export class SendEmailAfterSolicitationUseCase {
  constructor(
    @Inject(ChooseMailProvider)
    private chooseMailProvider: IChooseMailProvider
  ) {}

  async execute(solicitation: Solicitation): Promise<void> {
    try {
      const mailProvider: IProviderSendMail =
        await this.chooseMailProvider.chooseProviderToSendMail(solicitation);
      mailProvider.sendMail(solicitation);
    } catch (err) {
      throw new AppError(
        `Não foi possível fazer o envio de email após a criação da solicitação. Provider: ${solicitation?.companyKey}`
      );
    }
  }
}
