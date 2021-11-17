import { BizCapitalStatusEnum } from "../enums/bizStatus.enum";
import { IBizCapitalProposal } from "./bizcapitalProposal.interface";

export interface IBizCapitalWebhook {
    id: string,
    cnpj: string,
    status: BizCapitalStatusEnum,
    proposal: IBizCapitalProposal  
}