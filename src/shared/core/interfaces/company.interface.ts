import { ICredentials } from "./credentials.interface";

export interface ICompany {
  name: string;
  key: string;
  siteUrl: string;
  credentials?: ICredentials;
  metadata?: any;
}
