import { IContractDetails } from "src/shared/infra/database/typeorm/entities/contract.entity";
import { ContractStatusEnum } from "../enums/contractStatusEnum";


export interface UpdateContratDetailsPayload {
  contractId: string;
  details: IContractDetails;
  status: ContractStatusEnum;
}
