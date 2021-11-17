import { Inject, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { stringify } from 'querystring';
import { RealmMaster } from 'src/shared/core/decorators/realmMaster.decorator';
import AppError from 'src/shared/core/errors/AppError';
import { IGetTokenKeycloak } from 'src/shared/core/interfaces/keycloak/keycloakGetToken.interface';
import { IRole } from 'src/shared/core/interfaces/keycloak/role.interface';
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
export class RolesProvider extends KeycloakProvider {

  constructor() {
    super();
  }

  

  @RealmMaster()
  public async getRoleByName(realm: string, roleName: string): Promise<IRole> {
    const realmTarget = realm || process.env.REALM;
    
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      url: `${this.baseUrl}/admin/realms/${realmTarget}/roles/${roleName}`,
      method: 'GET'
    } as AxiosRequestConfig;

    return this.axios
      .request(requestConfig)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        throw new AppError(error.message, {
          status: error.response ? error.response.status : 403,
          keycloak_error: error?.response?.data.error_description || "",
        });
      });
  }
  
  @RealmMaster()
  public async getAllRolesForRealm(realm: string): Promise<IRole[]> {
    const realmTarget = realm || process.env.REALM;
    

    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      url: `${this.baseUrl}/admin/realms/${realmTarget}/roles`,
      method: 'GET'
    } as AxiosRequestConfig;

    return this.axios
      .request(requestConfig)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        throw new AppError(error.message, {
          status: error.response ? error.response.status : 403,
          keycloak_error: error?.response?.data.error_description || "",
        });
      });
  }

  @RealmMaster()
  public async addRealmRoleToUser(realm: string, userId: string, role: IRole): Promise<any> {
    const realmTarget = realm || process.env.REALM;
    
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      url: `${this.baseUrl}/admin/realms/${realmTarget}/users/${userId}/role-mappings/realm`,
      method: 'POST',
      data: [role]
    } as AxiosRequestConfig;

    return this.axios
      .request(requestConfig)
      .then((result) => {
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