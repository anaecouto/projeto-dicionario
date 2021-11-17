import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import AppError from 'src/shared/core/errors/AppError';
import ProviderError from 'src/shared/core/errors/ProviderError';
import { Company } from '../../domain/company/Company';
import { Solicitation } from '../../domain/solicitation/Solicitation';
import { ICompanyRepo } from '../../repositories/companyRepo.interface';
import { CompanyRepoTypeOrm } from '../../repositories/implementations/companyRepoTypeOrm';
import { ISolicitationProvider } from '../solicitation.provider';

@Injectable()
export class NexoosProvider
  implements ISolicitationProvider {

  constructor(
    @Inject(CompanyRepoTypeOrm)
    private companyRepo: ICompanyRepo,
  ) {}
  
  async sendSolicitation(companyKey: string, solicitation: Solicitation): Promise<void> {
    const company = await this.companyRepo.findByCompanyKey(companyKey);
    if(!company) {
      throw new AppError('Não foi possível encontrar as configurações de company para a chave: ', companyKey);
    }
    console.log('NEXOOS  PROVIDER!!!!!');
    const simulation: INexoosLoanRequest = solicitation.metadata;

    const borrower = solicitation.metadata.uuid;

    if(!borrower) {
      throw new AppError('Por favor passe o identificador');
    }

    console.log('CRIANDO EMPRESTIMO !!!');
    const result = await this.loans(simulation, borrower, company);

    console.log("Resposta nexoos: ", result);
  }

  public async sendSimulation(simulation: INexoosSimulationRequest, company: Company) : Promise<INexoosSimulationResponse[]> {
    const requestConfig = {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${company.credentials?.token}`
      },
      url: company.credentials?.baseUrl+'simulations',
      method: 'POST',
      data: simulation,
      timeout:  120000
    } as AxiosRequestConfig;

    return axios
      .request(requestConfig)
      .then((result) => {
        console.log('RESULTADO DA REQUEST NEXOOS: ', result);
        return result.data;
      })
      .catch((res) => {
        console.log("ERRO INESPERADO!: \n"+ res);
        throw new ProviderError(res);
      });
  }


  public async borrowers(borrower: INexoosBorrowerRequest, company: Company) : Promise<any> {
    const requestConfig = {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${company.credentials?.token}`
      },
      url: company.credentials?.baseUrl+'borrowers',
      method: 'POST',
      data: borrower,
      timeout:  120000
    } as AxiosRequestConfig;

    return axios
      .request(requestConfig)
      .then((result) => {
        console.log('NEXOOS BORROWER: ', result);
        return result.data;
      })
      .catch((res) => {
        console.log("ERRO INESPERADO BORROWE NEXOOS: \n"+ res);
        throw new ProviderError(res);
      });
  }

  private async loans(loan: INexoosLoanRequest, borrower: string, company: Company) : Promise<any> {
    const requestConfig = {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${company.credentials?.token}`
      },
      url: company.credentials?.baseUrl+'borrowers/'+borrower+'/loans',
      method: 'POST',
      data: loan,
      timeout:  120000
    } as AxiosRequestConfig;

    return axios
      .request(requestConfig)
      .then((result) => {
        console.log('NEXOOS BORROWER: ', result);
        return result.data;
      })
      .catch((res) => {
        console.log("ERRO INESPERADO BORROWE NEXOOS: \n"+ res);
        throw new ProviderError(res);
      });
  }

}