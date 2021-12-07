import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { CreateMultipleContractController } from "./controllers/contract/createMultipleContract.controller";
import { CreateNewContractController } from "./controllers/contract/createNewContract.controller";
import { PushSingleContractOnQueueEvent } from "./domain/_domainEvents/PushContractOnQueueEvent";
import { ContractRepoTypeOrm } from "./repositories/implementations/ContractRepoTypeOrm";
import { CreateMultipleContractUseCase } from "./useCases/createMultipleContractUseCase";
import { CreateNewContractUseCase } from "./useCases/createNewContractUseCase";
import { UpdateContractByCrawlerResponseUseCase } from "./useCases/updateContractByCrawlerResponseUseCase";
import { UpdateContractWhatsappUseCase } from "./useCases/updateContractWhatsappContactUseCase";

@Module({
  imports: [SharedModule],
  controllers: [CreateNewContractController, CreateMultipleContractController],
  providers: [
    CreateNewContractUseCase,
    CreateMultipleContractUseCase,
    UpdateContractByCrawlerResponseUseCase,
    UpdateContractWhatsappUseCase,
    ContractRepoTypeOrm,
    PushSingleContractOnQueueEvent
  ],
})
export class CorrespondenceModule {}
