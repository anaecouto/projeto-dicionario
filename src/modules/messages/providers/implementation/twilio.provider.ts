import { Injectable } from "@nestjs/common";
import { InjectTwilio, TwilioClient } from "nestjs-twilio";

@Injectable()
export class TwilioProvider {

  constructor(@InjectTwilio() private readonly client: TwilioClient) {
  }


  async sendSMS() {
    try {
      return await this.client.messages.create({
        body: 'SMS Body, sent to the phone!',
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        to: 'whatsapp:+5531986071643',
      });
    } catch (e) {
      return e;
    }
  }
}
message:'The From phone number +14155238886 is not a valid, SMS-capable inbound phone number or short code for your account.'
