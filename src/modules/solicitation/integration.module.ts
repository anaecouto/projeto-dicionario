import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { ContactController } from "./controllers/contact.controller";
import { ServicesController } from "./controllers/service.controller";
import { BaseProvider } from "./providers/implementation/base.provider";
import { ServiceRepoTypeOrm } from "./repositories/implementations/serviceRepoTypeOrm";
import { WsTokensRepoTypeOrm } from "./repositories/implementations/wsTokensTypeOrm.repository";
import { CreateNewServiceUseCase } from "./useCases/service/createNewServiceUseCase";
import { FindAllServicesUseCase } from "./useCases/service/findAllServicesUseCase";
import { FindServiceByIdUseCase } from "./useCases/service/findServiceByIdUseCase";
import { ContactRepoTypeOrm } from "./repositories/implementations/contactRepoTypeOrm";
import { CreateNewContactUseCase } from "./useCases/contact/createNewContactUseCase";
import { CompanyController } from "./controllers/company.controller";
import { CreateNewCompanyUseCase } from "./useCases/company/createNewCompanyUseCase";
import { CompanyRepoTypeOrm } from "./repositories/implementations/companyRepoTypeOrm";
import { SendContactToProviderUseCase } from "./useCases/contact/sendContactToProviderUseCase";
import { SendMailAfterSolicitationEvent } from "./domain/_domainEvents/SendMailAfterSoliciitationEvent";
import { ChooseMailProvider } from "./useCases/sendMail/impl/chooseMailProvider";
import { AccountRepoTypeOrm } from "../auth/account/repositories/implementations/accountRepoTypeOrm";
import { AWSMailProvider } from "../messages/providers/implementation/awsMail.provider";


@Module({
  imports: [SharedModule],
  controllers: [
    ContactController,
    ServicesController,
    CompanyController
  ],
  providers: [
    CreateNewServiceUseCase,
    FindAllServicesUseCase,
    FindServiceByIdUseCase,
    ServiceRepoTypeOrm,
    BaseProvider,
    CreateNewContactUseCase,
    ContactRepoTypeOrm,
    WsTokensRepoTypeOrm,
    CreateNewCompanyUseCase,
    CompanyRepoTypeOrm,
    SendContactToProviderUseCase,
    AWSMailProvider,
    SendMailAfterSolicitationEvent,
    ChooseMailProvider,
    AccountRepoTypeOrm
  ],
})
export class IntegrationModule {}
