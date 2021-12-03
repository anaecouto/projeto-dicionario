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
      this.client.emit('hello', 'hello world!');
    } catch (err) {
      console.log(err);
    }
    return {message: 'show'};
    
    // const message = ":cat:";
    // const record = new RmqRecordBuilder(dto)
    //   .setOptions({
    //     headers: {
    //       ["x-version"]: "1.0.0",
    //     },
    //     priority: 3,
    //   })
    //   .build();

    // this.client.send("replace-emoji", record).subscribe((result) => {
    //   console.log(result);
    //   return { messge: "show" };
    // });
    // return await this.clientAdminBackend.emit('criar-lead', dto);
  }

}
