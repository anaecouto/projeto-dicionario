import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { MessagesController } from "./controllers/messages.controller";

import { AWSMailProvider } from "./providers/implementation/awsMail.provider";
import { MessagesRepoTypeOrm } from "./repositories/implementations/MessagesRepoTypeOrm";
import { SenderRepoTypeOrm } from "./repositories/implementations/SenderRepoTypeOrm";
import { CreateNewMessagesUseCase } from "./useCases/createNewMessagesUseCase";
import { SendMailUseCase } from "./useCases/sendMailUseCase";
import { TwilioModule } from 'nestjs-twilio';
import { SendWhatsappMessagesUseCase } from "./useCases/sendWhatsappMessgeUseCase";
import { TwilioProvider } from "./providers/implementation/twilio.provider";
import { WhatsappController } from "./controllers/whatsapp.controller";
import { RabbitMQController } from "./controllers/rabbitmq.controlle";
import PushSingleContractOnQueue from "./subscriptions/pushSingleContractOnQueue";
import PushMultipleContractOnQueue from "./subscriptions/pushMultipleContractsOnQueue";
import { PushContractsOnQueueUseCase } from "./useCases/pushContractOnQueueUseCase";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [SharedModule,
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    ClientsModule.register([
      {
        name: 'MASSAGE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:EZ7DBqXDfPts@18.234.188.5:5672/hello'],
          queue: 'nest',
          queueOptions: {
            durable: true
          },
        },
      },
    ]),],
  controllers: [MessagesController, WhatsappController, RabbitMQController],
  providers: [
    CreateNewMessagesUseCase,
    PushContractsOnQueueUseCase,
    SenderRepoTypeOrm,
    MessagesRepoTypeOrm,
    AWSMailProvider,
    SendMailUseCase,
    SendWhatsappMessagesUseCase,
    TwilioProvider,
    PushSingleContractOnQueue,
    PushMultipleContractOnQueue
  ],
})
export class MessagesModule {}
