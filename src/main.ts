import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as bodyParser from 'body-parser';
import { ListeningResponsesFromQueueUseCase } from "./modules/messages/useCases/listeningResponsesFromQueue";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  await app.listen(process.env.PORT || 9000);


  ListeningResponsesFromQueueUseCase.execute();


}
bootstrap();
