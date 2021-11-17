import { Inject, Injectable } from "@nestjs/common";
import { ISolicitation } from "src/shared/core/interfaces/solicitation.interface";
import { SolicitationMapper } from "../../mappers/solicitationMap";
import { SolicitationRepoTypeOrm } from "../../repositories/implementations/solicitationRepoTypeOrm";
import { ISolicitationRepo } from "../../repositories/solicitationRepo.interface";
import { ISolicitationResponseDTO } from "./dto/createNewSolicitationDTO";

@Injectable()
export class FindSolicitationByIdUseCase {
  constructor(
    @Inject(SolicitationRepoTypeOrm) private solicitationRepo: ISolicitationRepo
  ) {}

  async execute(id: string): Promise<ISolicitation> {
    const solicitation = await this.solicitationRepo.findById(id);
    return SolicitationMapper.toDto(solicitation);
  }
}
