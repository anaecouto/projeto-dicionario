import { BadRequestException, HttpException, Inject, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { SolicitationStatusEnum } from 'src/shared/core/enums/solicitationStatus.enum';
import AppError from 'src/shared/core/errors/AppError';
import ProviderError from 'src/shared/core/errors/ProviderError';
import { Company } from '../../domain/company/Company';
import { Solicitation } from '../../domain/solicitation/Solicitation';
import { ICompanyRepo } from '../../repositories/companyRepo.interface';
import { SolicitationRepoTypeOrm } from '../../repositories/implementations/solicitationRepoTypeOrm';
import { ISolicitationRepo } from '../../repositories/solicitationRepo.interface';
import { ISolicitationProvider } from '../solicitation.provider';

@Injectable()
export class VamosParcelarProvider
  implements ISolicitationProvider {

  constructor(
    @Inject(SolicitationRepoTypeOrm)
    private solicitationRepo: ISolicitationRepo,
  ) {}
  
  async sendSolicitation(companyKey: string, solicitation: Solicitation): Promise<void> {
    console.log('PROVIDER VAMOS PARCELAR!!!');
    solicitation.setStatus(SolicitationStatusEnum.PENDING);
    this.solicitationRepo.save(solicitation);
  }
}