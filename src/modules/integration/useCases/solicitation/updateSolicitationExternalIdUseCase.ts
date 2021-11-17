import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/shared/core/IUseCase';
import { ISolicitationRepo } from '../../repositories/solicitationRepo.interface';
import { ISolicitation } from '../../../../shared/core/interfaces/solicitation.interface';
import { IUpdateSolicitationExternalIdDTO } from './dto/updateSolicitationExternalIdDTO';
import { SolicitationRepoTypeOrm } from '../../repositories/implementations/solicitationRepoTypeOrm';
@Injectable()
export class UpdateSolicitationExternalIdUseCase
  implements
    IUseCase<IUpdateSolicitationExternalIdDTO, ISolicitation> {
  constructor(@Inject(SolicitationRepoTypeOrm) private solicitationRepo: ISolicitationRepo) {}

  async execute(
    request: IUpdateSolicitationExternalIdDTO,
  ): Promise<any> {
    console.log('Atualizando externalId');
    await this.solicitationRepo.updateExternalId(request.solicitationId, request.externalId);
    console.log('Atualizou externalId');
  }
}
