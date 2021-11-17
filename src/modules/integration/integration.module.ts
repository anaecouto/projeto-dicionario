import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { ContactController } from "./controllers/contact.controller";
import { ServicesController } from "./controllers/service.controller";
import { SolicitationsController } from "./controllers/solicitations.controller";
import { BaseProvider } from "./providers/implementation/base.provider";
import { BizCapitalProvider } from "./providers/implementation/bizCapital.provider";
import { EasyCreditoProvider } from "./providers/implementation/easyCredito.provider";
import { ServiceRepoTypeOrm } from "./repositories/implementations/serviceRepoTypeOrm";
import { SolicitationRepoTypeOrm } from "./repositories/implementations/solicitationRepoTypeOrm";
import { WsTokensRepoTypeOrm } from "./repositories/implementations/wsTokensTypeOrm.repository";
import { CreateNewServiceUseCase } from "./useCases/service/createNewServiceUseCase";
import { FindAllServicesUseCase } from "./useCases/service/findAllServicesUseCase";
import { FindServiceByIdUseCase } from "./useCases/service/findServiceByIdUseCase";
import { ContactRepoTypeOrm } from "./repositories/implementations/contactRepoTypeOrm";
import { CreateNewSolicitationUseCase } from "./useCases/solicitation/createNewSolicitationUseCase";
import { FindAllSolicitationsUseCase } from "./useCases/solicitation/findAllSolicitation.useCase";
import { FindSolicitationByIdUseCase } from "./useCases/solicitation/findSolicitationByIdUseCase";
import { CreateNewContactUseCase } from "./useCases/contact/createNewContactUseCase";
import AfterSolicitationCreated from "./domain/subscriptions/afterSolicitationCreated";
import { SendSolicitationToProviderUseCase } from "./useCases/solicitation/sendSolicitationToProviderUseCase";
import AfterContactCreated from "./domain/subscriptions/afterContactCreated";
import { WebhookController } from "./controllers/webhook.controller";
import { CompanyController } from "./controllers/company.controller";
import { CreateNewCompanyUseCase } from "./useCases/company/createNewCompanyUseCase";
import { CompanyRepoTypeOrm } from "./repositories/implementations/companyRepoTypeOrm";
import { SendContactToProviderUseCase } from "./useCases/contact/sendContactToProviderUseCase";
import { UpdateStatusBizCapitalSolcitationUseCase } from "./useCases/solicitation/updateStatusBizSolicitationUseCase";
import { UpdateStatusEasyCreditoSolcitationUseCase } from "./useCases/solicitation/updateStatusEasyCreditoSolicitationUseCase";
import { UpdateSolicitationExternalIdUseCase } from "./useCases/solicitation/updateSolicitationExternalIdUseCase";
import { CreateEasyProposalUseCase } from "./useCases/solicitation/createEasyProposalUseCase";
import { SendEmailAfterSolicitationUseCase } from "./useCases/solicitation/sendEmailAfterSolicitationUseCase";
import { SendMailAfterSolicitationEvent } from "./domain/_domainEvents/SendMailAfterSoliciitationEvent";
import SenMailAfterSolicitationCreated from "./domain/subscriptions/sendMailAfterSolicitationCreated";
import { SolicitationGateway } from "./gateways/solicitation.gateway";
import { SolicitationService } from "./services/implementations/solicitationServiceImpl";
import { VamosParcelarProvider } from "./providers/implementation/vamosParcelar.provider";
import { NexoosProvider } from "./providers/implementation/nexoos.provider";
import { InfoSimplesProvider } from "./providers/implementation/infoSimples.provider";
import { ExecuteInfoSimplesDetranRequestUseCase } from "./useCases/executeInfoSimplesDetranRequest";
import { InfoSimplesController } from "./controllers/info.simples.controller";
import { CreateBorrowerNexoosUseCase } from "./useCases/solicitation/createBorrowerNexoosUseCase";
import S3StorageProvider from "src/shared/providers/storageProvider/implementations/S3StorageProvider";
import { MultiplikeProvider } from "./providers/implementation/multiplike.provider";
import { ChooseMailProvider } from "./useCases/sendMail/impl/chooseMailProvider";
import { MultiplikeSendMailUseCase } from "./useCases/sendMail/impl/multiplikeSendMailUseCase";
import { BizCapitalSendMailUseCase } from "./useCases/sendMail/impl/bizCapitalSendMailUseCase";
import { EasyCreditoSendMailUseCase } from "./useCases/sendMail/impl/easyCreditoSendMailUseCase";
import { InfoSimplesSendMailUseCase } from "./useCases/sendMail/impl/infoSimplesSendMailUseCase";
import { NexoosSendMailUseCase } from "./useCases/sendMail/impl/nexoosSendMailUseCase";
import { VamosParcelarSendMailUseCase } from "./useCases/sendMail/impl/vamosParcelarSendMailUseCase";
import { TestController } from "./controllers/test.controller";
import AssociateSubestablishedOrSellerToSolicitation from "./domain/subscriptions/associateSubestablishedOrSellerToSolicitation";
import { SetSolicitationInvolvedUseCase } from "./useCases/solicitation/setSolicitationInvolvedUseCase";
import { AccountRepoTypeOrm } from "../auth/account/repositories/implementations/accountRepoTypeOrm";
import { GetTotalizersUseCase } from "./useCases/solicitation/getTotalizersUseCase";
import { AWSMailProvider } from "../messages/providers/implementation/awsMail.provider";


@Module({
  imports: [SharedModule],
  controllers: [
    SolicitationsController,
    ContactController,
    ServicesController,
    WebhookController,
    CompanyController,
    InfoSimplesController,
    TestController
  ],
  providers: [
    CreateNewSolicitationUseCase,
    FindAllSolicitationsUseCase,
    FindSolicitationByIdUseCase,
    CreateNewServiceUseCase,
    FindAllServicesUseCase,
    FindServiceByIdUseCase,
    SolicitationRepoTypeOrm,
    ServiceRepoTypeOrm,
    BaseProvider,
    BizCapitalProvider,
    EasyCreditoProvider,
    CreateNewContactUseCase,
    ContactRepoTypeOrm,
    WsTokensRepoTypeOrm,
    AfterSolicitationCreated,
    SendSolicitationToProviderUseCase,
    CreateNewCompanyUseCase,
    CompanyRepoTypeOrm,
    AfterContactCreated,
    SendContactToProviderUseCase,
    AWSMailProvider,
    UpdateStatusBizCapitalSolcitationUseCase,
    UpdateStatusEasyCreditoSolcitationUseCase,
    UpdateSolicitationExternalIdUseCase,
    CreateEasyProposalUseCase,
    SendEmailAfterSolicitationUseCase,
    SendMailAfterSolicitationEvent,
    SenMailAfterSolicitationCreated,
    SolicitationGateway,
    SolicitationService,
    VamosParcelarProvider,
    NexoosProvider,
    InfoSimplesProvider,
    ExecuteInfoSimplesDetranRequestUseCase,
    CreateBorrowerNexoosUseCase,
    S3StorageProvider,
    MultiplikeProvider,
    ChooseMailProvider,
    MultiplikeSendMailUseCase,
    BizCapitalSendMailUseCase,
    EasyCreditoSendMailUseCase,
    InfoSimplesSendMailUseCase,
    NexoosSendMailUseCase,
    VamosParcelarSendMailUseCase,
    AssociateSubestablishedOrSellerToSolicitation,
    SetSolicitationInvolvedUseCase,
    AccountRepoTypeOrm,
    GetTotalizersUseCase
  ],
})
export class IntegrationModule {}
