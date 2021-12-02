import { Inject, Injectable } from "@nestjs/common";
import { AWSMailProvider } from "src/modules/messages/providers/implementation/awsMail.provider";
import { Contact } from "../../domain/contact/Contact";

@Injectable()
export class SendContactToProviderUseCase {
  constructor(
    @Inject(AWSMailProvider)
    private provider: AWSMailProvider
  ) {}

  async execute(request: Contact): Promise<void> {
    console.log('ENVIOU EMAIL ')
    const provider = await this.provider.sendMail(
      request.mail,
      "Primeiro Contato",
      "Olá " + request.name + " esse é o primeiro contato da BanDigital"
    );
  }
}
