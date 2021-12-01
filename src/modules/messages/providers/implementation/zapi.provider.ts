import { Injectable } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";
import { stringify } from "querystring";

@Injectable()
export class ZapiProvider {

  private readonly instanceId = '3A3448D0F42950271E1822AA050CAAA2';
  private readonly token = 'CA3E5C88CA4B9700923FBD96';
  private baseurl = '';
  constructor() {
    this.baseurl = `https://api.z-api.io/instances/${this.instanceId}/token/${this.token}/send-messages`;
  }


  async sendWhatsapp(phone: string, message: string) {
    const body = {
      phone,
      message
    };

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
}
