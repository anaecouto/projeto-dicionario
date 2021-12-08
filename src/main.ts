import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as bodyParser from 'body-parser';
import { ListeningResponsesFromQueueUseCase } from "./modules/messages/useCases/listeningResponsesFromQueue";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, JSON.parse(process.env.FACTORY_CORS_CONFIG || ''));
  console.log('FACTORY_CORS_CONFIG', process.env.FACTORY_CORS_CONFIG);
  await app.listen(process.env.PORT || 9000);


  ListeningResponsesFromQueueUseCase.execute();


}
bootstrap();
