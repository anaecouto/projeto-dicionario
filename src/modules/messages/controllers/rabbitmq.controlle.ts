import { Controller } from "@nestjs/common";
import { Response } from "express";
import { BaseController } from "src/shared/core/BaseController";
import { ClientProxy, ClienProxyFactory, Transport } from '@nestjs/microservices';

@Controller("rabbit")
export class RabbitMQController extends BaseController {
  private clientAdminBackend: ClientProxy;
  constructor() {
    this.clientAdminBackend = ClienProxyFactory.create(
      {
        transport: Transport.RM
      }
    );
    super();
  }
}
