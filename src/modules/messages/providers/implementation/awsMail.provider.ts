import { Injectable } from "@nestjs/common";
import { SES } from "aws-sdk";


import { BaseMailProvider } from "./baseMail.provider";
import * as nodemailer from "nodemailer";
@Injectable()
export class AWSMailProvider extends BaseMailProvider {

  constructor() {
    super(nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: "us-east-1",
      })
    }))
  }
}
