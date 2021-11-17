import { AccountTypeEnum } from "../enums/accountType.enum";
import { ISplitSettings } from "./splitSettings.interface";

export interface IAccountSettings {
  type: AccountTypeEnum;
  accountKey?: string; 
  split?: ISplitSettings[],
}