import { SolicitationOriginEnum } from "../enums/solicitationOrigin.enum";
import { SolicitationStatusEnum } from "../enums/solicitationStatus.enum";
import { SolicitationTypeEnum } from "../enums/solicitationType.enum";
import { IPerson } from "./person.interface";

export interface ICreateNewSolicitationRequestDTO {
    person?: IPerson;
    status?: SolicitationStatusEnum;
    origin?: SolicitationOriginEnum;
    type?: SolicitationTypeEnum;
    serviceKey: string;
    subServiceKey: string;
    companyKey: string;
    amount: number;
    productKey: string;
    metadata: Object;
    roomId?: string;
}