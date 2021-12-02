import { Inject, Injectable } from "@nestjs/common";
import {create} from 'express-handlebars';
import { AWSMailProvider } from "src/modules/messages/providers/implementation/awsMail.provider";
@Injectable()
export class BaseProviderSendMail {
  
  constructor(
    @Inject(AWSMailProvider)
    public mailProvider: AWSMailProvider
  ) {}

  async sendMailStatusCreated(sendTo: string): Promise<void> { 
    
    const hb = create();   
    const rederedHtml = await hb.render("./src/shared/views/statusCreatedTemplate.hbs",{});

    await this.mailProvider.sendMail(
      sendTo,
      "Solicitação coletada - BanDigital",
      'Teste',
      rederedHtml,
    );
  }
}
