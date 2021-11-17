import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { MessagesController } from "./controllers/messages.controller";

import { AWSMailProvider } from "./providers/implementation/awsMail.provider";
import { MessagesRepoTypeOrm } from "./repositories/implementations/MessagesRepoTypeOrm";
import { SenderRepoTypeOrm } from "./repositories/implementations/SenderRepoTypeOrm";
import { CreateNewMessagesUseCase } from "./useCases/createNewMessagesUseCase";
import { SendMailUseCase } from "./useCases/sendMailUseCase";

@Module({
  imports: [SharedModule],
  controllers: [MessagesController],
  providers: [
    CreateNewMessagesUseCase,
    SenderRepoTypeOrm,
    MessagesRepoTypeOrm,
    AWSMailProvider,
    SendMailUseCase
  ],
})
export class MessagesModule {}
