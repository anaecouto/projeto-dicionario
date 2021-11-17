import { Inject, Injectable } from "@nestjs/common";
import { SolicitationStatusEnum } from "src/shared/core/enums/solicitationStatus.enum";
import AppError from "src/shared/core/errors/AppError";
import { ISignUpCallBack } from "src/shared/core/interfaces/singupCallback.inteface";
import { ISolicitation } from "src/shared/core/interfaces/solicitation.interface";
import { Solicitation } from "../../domain/solicitation/Solicitation";
import { SolicitationGateway } from "../../gateways/solicitation.gateway";
import { SolicitationMapper } from "../../mappers/solicitationMap";
import { SolicitationRepoTypeOrm } from "../../repositories/implementations/solicitationRepoTypeOrm";
import { ISolicitationRepo } from "../../repositories/solicitationRepo.interface";

@Injectable()
export class UpdateStatusEasyCreditoSolcitationUseCase {
  constructor(
    @Inject(SolicitationRepoTypeOrm)
    private solicitationRepo: ISolicitationRepo,
    private readonly solicitationGateway: SolicitationGateway
  ) {}

  async updateStatus(
    callbackResponse: ISignUpCallBack
  ): Promise<ISolicitation> {
    const actionStatus = {
      SIGNUP_COMPLETED: this.signupCompleted,
      SIGNUP_DENIED: this.signupDenied,
      SIGNUP_ANALISIS: this.signupAnalysis,
      PROPOSAL_COMPLETED: this.proposalCompleted,
      PROPOSAL_DENIED: this.proposalDenied,
      PROPOSAL_ANALISIS: this.proposalAnalysis,
      PROPOSAL_CREATED: this.proposalAnalysis
    };

    console.log("UPDATE STATUS EASY CREDITO: ", callbackResponse);
    const solicitation = await this.solicitationRepo.findByExternalId(
      callbackResponse.id
    );
    console.log("SOLICITATION FOUND: ", solicitation);
    if (!solicitation) {
      console.log("NÃO ENCONTROU A SOLICITATION");
      throw new AppError('Não foi possível encontrar uma solicitação para o externalId (easy): ', callbackResponse.id);
    }
    console.log("ENCONTROU A SOLICITATION");
    try {
      actionStatus[callbackResponse.status](
        solicitation,
        this.solicitationRepo,
        callbackResponse,
        this.solicitationGateway
      );
    } catch (err) {
      console.error(
        "---------------->Erro ao encontrar startegt para o status: ",
        callbackResponse.status
      );
    }

    return SolicitationMapper.toDto(solicitation);
  }

  private signupCompleted(
    solicitation: Solicitation,
    solicitationRepo: ISolicitationRepo,
    callbackResponse: ISignUpCallBack,
    solicitationGateway: SolicitationGateway
  ) {
    solicitationGateway.server
      .to(solicitation.roomId)
      .emit("signUpResponse", callbackResponse);
    solicitation.setStatus(SolicitationStatusEnum.APPROVED);
    solicitationRepo.save(solicitation);
    console.log("UPDATE STATUS APPROVED");
  }

  private signupDenied(
    solicitation: Solicitation,
    solicitationRepo: ISolicitationRepo,
    callbackResponse: ISignUpCallBack,
    solicitationGateway: SolicitationGateway
  ) {
    solicitationGateway.server
      .to(solicitation.roomId)
      .emit("signUpResponse", callbackResponse);
    solicitation.setStatus(SolicitationStatusEnum.DENIED);
    solicitationRepo.save(solicitation);
    console.log("UPDATE STATUS DENIED");
  }

  private signupAnalysis(
    solicitation: Solicitation,
    solicitationRepo: ISolicitationRepo,
    callbackResponse: ISignUpCallBack,
    solicitationGateway: SolicitationGateway
  ) {
    //nada a fazer
  }

  private proposalAnalysis() {
    // TODO: 
  }

  private proposalDenied() {
    // TODO: 
  }

  private proposalCompleted() {
    // TODO: 
  }
}
