import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/core/IUseCase";
import {
  ICreateNewMessagesRequestDTO,
  ICreateNewMessagesResponseDTO,
} from "../dtos/createNewMessagesDTO";

import { AWSMailProvider } from "../providers/implementation/awsMail.provider";

@Injectable()
export class SendMailUseCase
  implements
    IUseCase<ICreateNewMessagesRequestDTO, ICreateNewMessagesResponseDTO>
{
  constructor(@Inject(AWSMailProvider) private mailProvider: AWSMailProvider) {}

  async execute(): Promise<any> {
    
    // await this.mailProvider.sendMail(
    //   "adrianonevesps@gmail.com",
    //   "Contao BanDigital",
    //   "Este é um email teste"
    // );

    // await this.mailProvider.sendMailWithAttachment(
    //   "adrianonevesps@gmail.com",
    //   "Contao BanDigital 2",
    //   "Este é um email teste 2",
    //   null,
    //   [{
    //     filename: 'teste.txt',
    //     content: Buffer.from('teste teste teste'),
    //   },
    //   {
    //     filename: 'teste2.txt',
    //     content: Buffer.from('teste teste teste'),
    //   }]
    // );
    return null;
  }
}
