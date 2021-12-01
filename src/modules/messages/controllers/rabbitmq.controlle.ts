import { Body, Controller, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  EventPattern,
  Payload,
  Transport,
} from '@nestjs/microservices';

@Controller('rabbit')
export class RabbitMQController {
  private clientAdminBackend: ClientProxy;
  constructor() {
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

  @EventPattern('criar-lead')
  async subscribeLead(@Payload() payload: any) {
    console.log('------>CRAWLER PEGOU DA FILA: ');
    console.log(JSON.stringify(payload));
  }
}
