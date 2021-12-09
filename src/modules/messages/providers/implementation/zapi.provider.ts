import { Injectable } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";

@Injectable()
export class ZapiProvider {

  private readonly instanceId = '3A38E64EFDD6B0F4031886AA720AC604';
  private readonly token = '1C7CF2E95FAE1B843888C3C8';
  private baseurl = '';
  constructor() {
    this.baseurl = `https://api.z-api.io/instances/${this.instanceId}/token/${this.token}/send-messages`;
  }


  async sendWhatsapp(phone: string, message: string) {
    const body = this.buildMessageBody(phone, message);
    // const body = {
    //   phone: '55'+phone,
    //   message
    // }
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      url: this.baseurl,
      method: "POST",
      data: body,
    } as AxiosRequestConfig;

    return axios
      .request(requestConfig)
      .then((result) => {
        console.log("RESULT: "+ result);
        return result.data;
      })
      .catch((res) => {
        console.log(res);
      });
  }

  private buildMessageBody(phone: string, message: string): any {
    return process.env.ENVIRONMENT === 'PROD'?
      {
        phone,
        message
      }
      : {
        phone: '5531986071643',
        message
      }
  }
}
