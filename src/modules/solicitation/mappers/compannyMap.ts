import { ICompany } from "src/shared/core/interfaces/company.interface";
import { UniqueEntityID } from "src/shared/domain/UniqueEntityID";
import { CompanyEntity } from "src/shared/infra/database/typeorm/entities/company.entity";
import { DeepPartial } from "typeorm";
import { Company, CompanyProps } from "../domain/company/Company";
import { CredentialsMapper } from "./credentialsMap";

export class CompanyMapper {
  static toDomain(dbCompany: CompanyEntity): Company {
    const companyProps = {
      name: dbCompany.name,
      key: dbCompany.key,
      siteUrl: dbCompany.siteUrl,
      credentials: dbCompany.credentials,
      metadata: dbCompany.metadata,
    } as CompanyProps;

    return Company.create(companyProps, UniqueEntityID.create(dbCompany._id));
  }

  static toPersistence(
    company: Company
  ): DeepPartial<CompanyEntity> {
    const credentials = CredentialsMapper.toDto(company?.credentials);

    return {
      _id: company.id.toValue(),
      name: company.name,
      key: company.key,
      siteUrl: company.siteUrl,
      credentials,
      metadata: company?.metadata,
    };
  }

  static toDto(dbCompany: Company): ICompany {
    return {
      name: dbCompany.name,
      key: dbCompany.key,
      siteUrl: dbCompany.siteUrl,
      credentials: dbCompany?.credentials,
      metadata: dbCompany?.metadata
    }
  }
}
