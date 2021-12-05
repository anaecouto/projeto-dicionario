

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import { AppModule } from "./app.module";
import { RedocModule, RedocOptions } from "nestjs-redoc";
import { Transport } from "@nestjs/microservices";
import { RabbitMQServer } from "./rabbitMQ.server";
import { ListeningResponsesFromQueueUseCase } from "./modules/messages/useCases/listeningResponsesFromQueue";
import { UpdateContractUseCase } from "./modules/messages/useCases/updateContractUseCase";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(process.env.PORT || 9000);

  ListeningResponsesFromQueueUseCase.execute();


}
bootstrap();
