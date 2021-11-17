import { Inject, Injectable, Param } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";
import AppError from "src/shared/core/errors/AppError";
import ProviderError from "src/shared/core/errors/ProviderError";
import { Company } from "../../domain/company/Company";
import { Solicitation } from "../../domain/solicitation/Solicitation";
import { ICompanyRepo } from "../../repositories/companyRepo.interface";
import { CompanyRepoTypeOrm } from "../../repositories/implementations/companyRepoTypeOrm";
import { SolicitationRepoTypeOrm } from "../../repositories/implementations/solicitationRepoTypeOrm";
import { ISolicitationRepo } from "../../repositories/solicitationRepo.interface";
import { ISolicitationProvider } from "../solicitation.provider";

@Injectable()
export class InfoSimplesProvider implements ISolicitationProvider {
  constructor(
    @Inject(CompanyRepoTypeOrm)
    private companyRepo: ICompanyRepo,
    @Inject(SolicitationRepoTypeOrm)
    private solicitationRepo: ISolicitationRepo
  ) {}

  async sendSolicitation(
    companyKey: string,
    solicitation: Solicitation
  ): Promise<any> {
    const company = await this.companyRepo.findByCompanyKey(companyKey);
    if (!company) {
      throw new AppError(
        "Não foi possível encontrar as configurações de company para a chave: ",
        companyKey
      );
    }
    console.log("INFO SIMPLES PROVIDER!!!!!");
    const infoSimplesRequest: IInfoSimplesRequestInterface =
      solicitation.metadata;
    const metadataObject: IInfoSimplesMetadataObject =
      company.metadata[infoSimplesRequest.state];

    const result = await this.detranRequestInfoSimples(company, infoSimplesRequest, metadataObject);
    return result;
    // const result = await this.loanApplications(
    //   loanApplications,
    //   company,
    //   solicitation
    // );

    // solicitation.externalId = result.loanApplicationId;
    // this.solicitationRepo.save(solicitation);
  }

  async detranRequestInfoSimples(
    company: Company,
    infoSimplesRequest: IInfoSimplesRequestInterface,
    metadataObject: IInfoSimplesMetadataObject
  ): Promise<any> {
    const url = await this.buildInfoSimplesUrl(company, infoSimplesRequest, metadataObject);
    const requestConfig = {
      url,
      method: "GET",
      timeout: 120000,
    } as AxiosRequestConfig;

    return axios
      .request(requestConfig)
      .then((result) => {
        console.log("RESULTADO DA REQUEST INFO SIMPLES: ", result);
        return result.data;
      })
      .catch((res) => {
        console.log("ERRO INESPERADO!: \n" + res);
        throw new ProviderError(res);
      });
  }

  private async buildInfoSimplesUrl(
    company: Company,
    infoSimplesRequest: IInfoSimplesRequestInterface,
    metadataObject: IInfoSimplesMetadataObject
  ): Promise<string | undefined> {
    const paramsList = await this.buildParamsUrl(infoSimplesRequest, metadataObject);
    const url = company.credentials?.baseUrl.concat(
      infoSimplesRequest.state,
      "/",
      metadataObject.typeUrl,
      "?token=",
      company.credentials.token,
      "&timeout=",metadataObject.timeout,
      "&", paramsList
    );
    return url;
  }

  private async buildParamsUrl(
    infoSimplesRequest: IInfoSimplesRequestInterface,
    metadataObject: IInfoSimplesMetadataObject
  ): Promise<string> {
    if (!metadataObject?.params) {
      throw new AppError(
        "Não foi possível encontrar uma configuração de parâmetros para a requisição da InfoSimples no banco de dados para o estado: ",
        infoSimplesRequest.state
      );
    }
    const split = metadataObject.params.split(",");
    const paramsList = await Promise.all(split.map(async (element) => {
      const parmValue = infoSimplesRequest[element.trim()];
      if (!parmValue)
        throw new AppError(
          "Erro ao realizar requisição do provedor InfoSimples. Motivo: O parâmetro ".concat(
            element,
            " não foi encontrado."
          )
        );      
      return element.trim().concat("=", parmValue);
    }));
    return paramsList.join('&');
  }
}
