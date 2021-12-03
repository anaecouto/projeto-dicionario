

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import { AppModule } from "./app.module";
import { RedocModule, RedocOptions } from "nestjs-redoc";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const microservice = app.connectMicroservice( 
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:EZ7DBqXDfPts@18.234.188.5:5672/hello'],
        queue: 'nest',
        queueOptions: {
          durable: true,
        },
      },
    });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 9000);
}
bootstrap();
