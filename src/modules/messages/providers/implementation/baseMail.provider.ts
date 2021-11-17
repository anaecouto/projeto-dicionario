import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { IAttachment } from "src/shared/core/interfaces/attachment.interface";
import { BaseMailProviderInterface } from "../baseMailProvider";


@Injectable()
export class BaseMailProvider implements BaseMailProviderInterface {
  private readonly source = 'Contato <bandigital@bandigital.com.br>'
  private transporter: any;

  constructor(transporter: any) {
    this.transporter = transporter;
  }

  async sendMail(email, subject, text, html?) {
    let info = await this.transporter.sendMail({
      from: this.source, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html // HTML version of the message
    });

    console.log("Info email" + info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  async sendMailWithAttachment(email: string, subject: any, text: any, html: any, attachments: IAttachment[]) {
    try {
      let info = await this.transporter.sendMail({
        from: this.source, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        attachments,
        html: html,
      });
  
      console.log("Info email" + info.messageId);
  
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch(err) {
      throw Error(err.message);
    }
  }
}
