
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
