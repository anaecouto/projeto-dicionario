import { Inject, Injectable } from "@nestjs/common";
import AppError from "src/shared/core/errors/AppError";
import { InfoSimplesProvider } from "../providers/implementation/infoSimples.provider";
import { ICompanyRepo } from "../repositories/companyRepo.interface";
import { CompanyRepoTypeOrm } from "../repositories/implementations/companyRepoTypeOrm";

@Injectable()
export class ExecuteInfoSimplesDetranRequestUseCase {
  private readonly companyKey = "infoSimples";
  constructor(
    private infoSimplesProvider: InfoSimplesProvider,
    @Inject(CompanyRepoTypeOrm)
    private companyRepo: ICompanyRepo
  ) {}

  async executeRequest(request: IInfoSimplesRequestInterface): Promise<any> {
    const company = await this.companyRepo.findByCompanyKey(this.companyKey);
    if (!company) {
      throw new AppError(
        "Não foi possível encontrar as configurações de company para a chave: ",
        this.companyKey
      );
    }
    console.log("INFO SIMPLES PROVIDER!!!!!");
    const metadataObject: IInfoSimplesMetadataObject =
      company.metadata[request.state];

    const result = await this.infoSimplesProvider.detranRequestInfoSimples(
      company,
      request,
      metadataObject
    );
    return result;
  }
}
