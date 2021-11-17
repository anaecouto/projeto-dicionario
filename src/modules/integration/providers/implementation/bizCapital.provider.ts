import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { SolicitationStatusEnum } from 'src/shared/core/enums/solicitationStatus.enum';
import AppError from 'src/shared/core/errors/AppError';
import ProviderError from 'src/shared/core/errors/ProviderError';
import BizCapitalProviderError from 'src/shared/core/errors/providers/BizCapitalProviderError';
import { Company } from '../../domain/company/Company';
import { Solicitation } from '../../domain/solicitation/Solicitation';
import { ICompanyRepo } from '../../repositories/companyRepo.interface';
import { CompanyRepoTypeOrm } from '../../repositories/implementations/companyRepoTypeOrm';
import { SolicitationRepoTypeOrm } from '../../repositories/implementations/solicitationRepoTypeOrm';
import { ISolicitationRepo } from '../../repositories/solicitationRepo.interface';
import { ISolicitationProvider } from '../solicitation.provider';

@Injectable()
export class BizCapitalProvider
  implements ISolicitationProvider {

  constructor(
    @Inject(CompanyRepoTypeOrm)
    private companyRepo: ICompanyRepo,
    @Inject(SolicitationRepoTypeOrm)
    private solicitationRepo: ISolicitationRepo,
  ) {}
  
  async sendSolicitation(companyKey: string, solicitation: Solicitation): Promise<void> {
    const company = await this.companyRepo.findByCompanyKey(companyKey);
    if(!company) {
      throw new AppError('Não foi possível encontrar as configurações de company para a chave: ', companyKey);
    }
    console.log('BIZ CAPITAL PROVIDER!!!!!');
    const loanApplications: IBizCapitalLoanRequest = solicitation.metadata;

    const result = await this.loanApplications(loanApplications, company, solicitation);
    
    solicitation.externalId = result.loanApplicationId;
    this.solicitationRepo.save(solicitation);
    console.log("Resposta: "+result);
  }

  private async loanApplications(loanApplications: IBizCapitalLoanRequest, company: Company, solicitation: Solicitation) : Promise<BizCapitalLoanResponse> {
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${company.credentials?.token}`
      },
      url: company.credentials?.baseUrl+'/loan-applications',
      method: 'POST',
      data: loanApplications,
      timeout:  120000
    } as AxiosRequestConfig;

    return axios
      .request(requestConfig)
      .then((result) => {
        console.log('RESULTADO DA REQUEST EASY: ', result);
        return result.data;
      })
      .catch((res) => {
        console.log("ERRO INESPERADO!: \n"+ res);
        this.setStatusLost(solicitation);
        throw new BizCapitalProviderError(res);
      });
  }

  private async setStatusLost(solicitation: Solicitation) {
    solicitation.setStatus(SolicitationStatusEnum.LOST);
    console.log('SET STATUS LOST');
    this.solicitationRepo.save(solicitation);
  }
}