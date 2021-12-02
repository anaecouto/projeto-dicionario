import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { CreateNewContractController } from "./controllers/createNewContract.controller";
import { PushContractOnQueueEvent } from "./domain/_domainEvents/PushContractOnQueueEvent";
import { ContractRepoTypeOrm } from "./repositories/implementations/ContractRepoTypeOrm";
import { CreateNewContractUseCase } from "./useCases/createNewContractUseCase";

@Module({
  imports: [SharedModule],
  controllers: [CreateNewContractController],
  providers: [
    CreateNewContractUseCase,
    ContractRepoTypeOrm,
    PushContractOnQueueEvent,
  ],
})
export class CorrespondenceModule {}
