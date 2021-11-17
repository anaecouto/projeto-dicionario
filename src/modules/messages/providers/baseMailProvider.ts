import { IAttachment } from "src/shared/core/interfaces/attachment.interface";

export interface BaseMailProviderInterface {
  sendMail(email: string, subject: any, text: any, html?: any);
  sendMailWithAttachment(email: string, subject: any, text: any, html: any, attachments: IAttachment[]);
}
