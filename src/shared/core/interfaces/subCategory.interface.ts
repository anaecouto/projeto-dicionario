import { ICredentials } from "./credentials.interface";

export interface ISubCategory {
  title: string;
  key: string;
  sequence: number;
  siteUrl: string;
  baseUrl: string;
  credentials: ICredentials;
}
