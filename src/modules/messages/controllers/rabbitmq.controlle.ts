import { Body, Controller, Post } from "@nestjs/common";
import { Response } from "express";
import { BaseController } from "src/shared/core/BaseController";
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';

@Controller("rabbit")
export class RabbitMQController extends BaseController {
  private clientAdminBackend: ClientProxy;
  constructor() {
    super();
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:EZ7DBqXDfPts@18.234.188.5:5672/lbsdigital'],
        queue: 'crawler',
      },
    });
  }

  @Post('crawler')
  async pushLead(@Body() dto: any) {
    console.log('------>CHEGOU REQUEST NO CRAWLER: ');
    return await this.clientAdminBackend.emit('criar-lead', dto);
  }
}
