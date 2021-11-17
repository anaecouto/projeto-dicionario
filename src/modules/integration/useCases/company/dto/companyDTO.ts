import { IContact } from "src/shared/core/interfaces/contact.interface";
import { IContract } from "src/shared/core/interfaces/contract.interface";


export interface CredentialsDTO {
  baseUrl: string;
  token?: string;
  username?: string;
  password?: string;
}
export interface ICompanyRequestDTO {
    name: string;
    key: string;
    siteUrl?: string;
    credentials?: CredentialsDTO;  
  }
  
export interface ICompanyResponseDTO{
  name: string;
  key: string;
  siteUrl: string;
  credentials?: CredentialsDTO;
}
