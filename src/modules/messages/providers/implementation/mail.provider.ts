import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailProvider {
  account: string = "mail.gmail.com";
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "credibandigitaldev@gmail.com", // generated ethereal user
      pass: "Crediban@2021", // generated ethereal password
    },
  });

  constructor() {}

  async sendMail(email: string, subject: any, text: any, html?: any) {
    let info = await this.transporter.sendMail({
      from: '"Contato" <credibandigitaldev@gmail.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html // HTML version of the message
    });

    console.log("Info email" + info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  async sendMailWithAttachment(email: string, subject: any, text: any, html, attachment) {
    try {
      let info = await this.transporter.sendMail({
        from: '"Contato" <contato@credibandigital.com.br>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        attachments: attachment,
        html: html,
      });
  
      console.log("Info email" + info.messageId);
  
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch(err) {
      throw Error(err.message);
    }
  }
}
