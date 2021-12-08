import { UniqueEntityID } from "src/shared/domain/UniqueEntityID";
import { IContractDetails } from "src/shared/infra/database/typeorm/entities/contract.entity";
import { ContractStatusEnum } from "../enums/contractStatusEnum";

export class Alternative {
  fullPrice: string;
  times: string;
  individual: string;
  monthTax: string;
  description: string;
}

export interface Option {
  title: string;
  alternatives: Alternative[];
}

export interface IContract {
  _id?: UniqueEntityID;
  agency: string;
  account: string;
  document: string;
  name: string;
  state: string;
  sex?: string;
  birthDate?: Date;
  status?: ContractStatusEnum;
  phones: string[];
  contactedPhones?: string[];
  options?: Option[];
  details?: IContractDetails;
}
