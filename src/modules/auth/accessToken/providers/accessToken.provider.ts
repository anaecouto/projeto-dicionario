import { Inject, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { stringify } from 'querystring';
import AppError from 'src/shared/core/errors/AppError';
import { IGetTokenKeycloak } from 'src/shared/core/interfaces/keycloak/keycloakGetToken.interface';
import { KeycloakProvider } from '../../provider/keycloak.provider';

interface TokenResponse {
  access_token: string, 
  expires_in: number,
  refresh_expires_in: number,
  refresh_token: string,
  token_type: string,
  session_state: string,
  scope: string
}

@Injectable()
export class AccessTokenProvider extends KeycloakProvider {

  constructor() {
    super();
  }
  
  public async token(payload: IGetTokenKeycloak): Promise<TokenResponse> {
    const realmTarget = payload.realm || process.env.REALM;
    const body = {
      client_id: payload.clientId || 'backoffice-cli',
      client_secret: payload.clientSecret || '3dba6fec-6c34-4234-b9d1-adc81b3b0e0e',
      username: payload.username,
      password: payload.password,
      grant_type: payload.grantType || 'password',
      scope: 'openid'
    };

    const requestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: `${this.baseUrl}/realms/${realmTarget}/protocol/openid-connect/token`,
      method: "POST",
      data: stringify(body),
    } as AxiosRequestConfig;

    return this.axios
      .request(requestConfig)
      .then((result) => {
        console.log("TOKEN: "+ result);
        return result.data;
      })
      .catch((error) => {
        throw new AppError(error.message, {
          status: error.response ? error.response.status : 403,
          keycloak_error: error?.response?.data.error_description || "",
        });
      });
  }
}