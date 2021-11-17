export interface IGetTokenKeycloak {
  username: string;
  password: string;
  realm?: string;
  clientId?: string;
  clientSecret?: string;
  grantType?: string;
}
