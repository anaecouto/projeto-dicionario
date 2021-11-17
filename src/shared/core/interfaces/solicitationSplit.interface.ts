import { AccountTypeEnum } from "../enums/accountType.enum";

export interface ISolicitationSplit {
  accountId: string;
  accountType: AccountTypeEnum;
  accountKey: string;
  percentage: number;
  calculatedAmount: number;
}
