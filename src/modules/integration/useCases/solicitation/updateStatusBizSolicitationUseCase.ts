import { Inject, Injectable } from "@nestjs/common";
import { SolicitationStatusEnum } from "src/shared/core/enums/solicitationStatus.enum";
import AppError from "src/shared/core/errors/AppError";
import { IBizCapitalProposal } from "src/shared/core/interfaces/bizcapitalProposal.interface";
import { ISolicitation } from "src/shared/core/interfaces/solicitation.interface";
import { BizCapitalWebhookValidation } from "../../controllers/validations/bizcapitalWebhook.validation";
import { Solicitation } from "../../domain/solicitation/Solicitation";
import { SolicitationMapper } from "../../mappers/solicitationMap";
import { SolicitationRepoTypeOrm } from "../../repositories/implementations/solicitationRepoTypeOrm";
import { ISolicitationRepo } from "../../repositories/solicitationRepo.interface";

@Injectable()
export class UpdateStatusBizCapitalSolcitationUseCase {
  constructor(
    @Inject(SolicitationRepoTypeOrm)
    private solicitationRepo: ISolicitationRepo
  ) {}

  async updateStatus(
    request: BizCapitalWebhookValidation
  ): Promise<ISolicitation> {
    const actionStatus = {
      APPROVED: this.bizCompleted,
      REJECTED: this.bizDenied,
      DENIED: this.bizDenied,
      WAITING_LIST: this.bizAnalysis,
      RECEIVED: this.bizAnalysis,
      AWAITING: this.bizAnalysis,
      IN_ANALYSIS: this.bizAnalysis,
      DOCUMENTS_PENDING: this.bizAnalysis,
      SIGNATURE_PENDING: this.bizAnalysis,
    };

    let solicitation = await this.solicitationRepo.findByExternalId(
      request.id
    );
    
    if (!solicitation) {
      console.log("NÃO ENCONTROU SOLICITATION");
      solicitation = await this.validateNotFoundSolicitation(request);
    }
    console.log("-------------->ENCONTROU SOLICITATION: ", solicitation);
    try {
      actionStatus[request.status](
        solicitation,
        request.proposal,
        this.solicitationRepo
      );
    } catch (err) {
      console.error(
        "---------------->Biz - Erro ao encontrar startegt para o status: ",
        request.status
      );
    }

    return SolicitationMapper.toDto(solicitation);
  }

  private async validateNotFoundSolicitation(request: BizCapitalWebhookValidation): Promise<Solicitation> {
    const lostSolicitation =
      await this.solicitationRepo.findLostSolicitationCreatedTodayByCnpj(
        request.cnpj
      );

    if(!lostSolicitation) {
      throw new AppError(
        "Não foi possível encontrar uma solicitação para o externalId (biz): ",
        request.id
      );
    }
    lostSolicitation?.setExternalId(request.id);
    console.log('ENCONTROU A SOLICITATION PELO CNPJ: ', lostSolicitation);
    return await this.solicitationRepo.save(lostSolicitation);
    
  }

  private bizCompleted(
    solicitation: Solicitation,
    proposal: IBizCapitalProposal,
    solicitationRepo: ISolicitationRepo
  ) {
    console.log("--------------->BIZ COMPLETED: ", solicitation);
    solicitation.setStatus(SolicitationStatusEnum.APPROVED);
    solicitationRepo.save(solicitation);
    console.log("UPDATE STATUS APPROVED");
  }

  private bizDenied(
    solicitation: Solicitation,
    proposal: IBizCapitalProposal,
    solicitationRepo: ISolicitationRepo
  ) {
    console.log("--------------->BIZ DENIED: ", solicitation);
    solicitation.setStatus(SolicitationStatusEnum.DENIED);
    solicitationRepo.save(solicitation);
    console.log("UPDATE STATUS DENIED");
  }

  private bizAnalysis(
    solicitation: Solicitation,
    proposal: IBizCapitalProposal,
    solicitationRepo: ISolicitationRepo
  ) {
    if(solicitation.status !== SolicitationStatusEnum.PENDING) {
      console.log("--------------->BIZ ANALYSIS: ", solicitation);
      solicitation.setStatus(SolicitationStatusEnum.PENDING);
      solicitation.metadata = { ...solicitation.metadata, proposal };
      solicitationRepo.save(solicitation);
      console.log("UPDATE STATUS PENDING");
    }
  }
}
