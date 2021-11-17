import { Inject, Injectable } from "@nestjs/common";
import AppError from "src/shared/core/errors/AppError";
import { ISolicitation } from "src/shared/core/interfaces/solicitation.interface";
import { SolicitationMapper } from "../../mappers/solicitationMap";
import { IBaseProvider } from "../../providers/baseProvider.interface";
import { BaseProvider } from "../../providers/implementation/base.provider";
import { SolicitationRepoTypeOrm } from "../../repositories/implementations/solicitationRepoTypeOrm";
import { ISolicitationRepo } from "../../repositories/solicitationRepo.interface";

@Injectable()
export class FindAllSolicitationsUseCase {
  constructor(
    @Inject(SolicitationRepoTypeOrm)
    private solicitationRepo: ISolicitationRepo,
    @Inject(BaseProvider)
    private baseProvider: IBaseProvider
  ) {}

  async execute(): Promise<ISolicitation[]> {
    const solicitations = await this.solicitationRepo.findAll({});
    return [];
    // return solicitations?.map((element) => {
    //   return SolicitationMapper.toDto(element ||{});
    // });
  }
}
