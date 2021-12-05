import { Option } from "src/shared/infra/database/typeorm/entities/contract.entity";
import { ContractStatusEnum } from "../enums/contractStatusEnum";

export interface ICrawlerResult {
  status: ContractStatusEnum,
  report: string,
  options: Option[]
}


export interface ICrawlerResponseMessage {
  agency: string,
  account: string,
  document: string,
  report: string,
  crawlerResult: ICrawlerResult,
}
