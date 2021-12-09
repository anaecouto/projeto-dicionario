import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { ZapiProvider } from "../messages/providers/implementation/zapi.provider";
import { SendMultipleWhatsappMessagesUseCase } from "../messages/useCases/sendMultipleWhatsappMessageUseCase";
import { CreateMultipleContractController } from "./controllers/contract/createMultipleContract.controller";
import { CreateNewContractController } from "./controllers/contract/createNewContract.controller";
import { SaveContractDetailsController } from "./controllers/contract/saveContractDetails.controller";
import { SendMultipleWhatsappContactController } from "./controllers/contract/sendMultipleContact.controller";
import { PushSingleContractOnQueueEvent } from "./domain/_domainEvents/PushContractOnQueueEvent";
import { ContractRepoTypeOrm } from "./repositories/implementations/ContractRepoTypeOrm";
import { CreateMultipleContractUseCase } from "./useCases/createMultipleContractUseCase";
import { CreateNewContractUseCase } from "./useCases/createNewContractUseCase";
import { SaveContractDetailsUseCse } from "./useCases/saveContractDetailsUseCase";
import { SendMultipleContactUseCase } from "./useCases/sendMultipleContactUseCase";
import { UpdateContractByCrawlerResponseUseCase } from "./useCases/updateContractByCrawlerResponseUseCase";
import { UpdateContractWhatsappUseCase } from "./useCases/updateContractWhatsappContactUseCase";

@Module({
  imports: [SharedModule],
  controllers: [
    CreateNewContractController,
    CreateMultipleContractController,
    SaveContractDetailsController,
    SendMultipleWhatsappContactController,
  ],
  providers: [
    CreateNewContractUseCase,
    CreateMultipleContractUseCase,
    UpdateContractByCrawlerResponseUseCase,
    UpdateContractWhatsappUseCase,
    SaveContractDetailsUseCse,
    SendMultipleContactUseCase,
    ContractRepoTypeOrm,
    PushSingleContractOnQueueEvent,
    ZapiProvider,
  ],
})
export class CorrespondenceModule {}
