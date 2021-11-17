import { SolicitationOriginEnum } from "../enums/solicitationOrigin.enum";
import { SolicitationStatusEnum } from "../enums/solicitationStatus.enum";
import { SolicitationTypeEnum } from "../enums/solicitationType.enum";
import { IContract } from "./contract.interface";
import { IPerson } from "./person.interface";

export interface ISolicitation {
  person?: IPerson;
  status?: SolicitationStatusEnum;
  contract?: IContract;
  origin?: SolicitationOriginEnum;
  type?: SolicitationTypeEnum;
  serviceKey: string;
  subServiceKey: string;
  companyKey: string;
  amount: number;
  productKey: string;
  metadata?: any;
  externalId?: string;
  roomId?: string;
}
