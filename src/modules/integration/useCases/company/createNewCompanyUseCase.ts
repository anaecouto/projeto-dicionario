import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/core/IUseCase";
import { Credentials } from "../../domain/company/Credentials";
import { Company } from "../../domain/company/Company";
import { ICompanyRepo } from "../../repositories/companyRepo.interface";
import { ICompanyRequestDTO, ICompanyResponseDTO } from "./dto/companyDTO";
import { CompanyMapper } from "../../mappers/compannyMap";
import { CompanyRepoTypeOrm } from "../../repositories/implementations/companyRepoTypeOrm";

@Injectable()
export class CreateNewCompanyUseCase
  implements
    IUseCase<ICompanyRequestDTO, ICompanyResponseDTO> {
  constructor(@Inject(CompanyRepoTypeOrm) private companyRepo: ICompanyRepo) {}

  async execute(
    request: ICompanyRequestDTO,
  ): Promise<ICompanyResponseDTO> {
    const credentials = Credentials.create(request?.credentials);
    const company = Company.create({...request, credentials});
    return CompanyMapper.toDto(await this.companyRepo.save(company));
  }
}