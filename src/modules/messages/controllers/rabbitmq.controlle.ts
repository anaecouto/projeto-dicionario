import { Body, Controller, Inject, Injectable, Post } from "@nestjs/common";
import {
  ClientProxy
} from "@nestjs/microservices";

@Controller("rabbit")
export class RabbitMQController {
  
  constructor(@Inject('MASSAGE_SERVICE') private readonly client: ClientProxy) {
  }

  @Post("crawler")
  async pushLead(@Body() dto: any) {
    console.log("------>CHEGOU REQUEST NO CRAWLER: ");
    try {
      this.client.emit('/lbs', 'hello world!');
    } catch (err) {
      console.log(err);
    }
    return {message: 'show'};
  }

}
