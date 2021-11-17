import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { RealmMaster } from "src/shared/core/decorators/realmMaster.decorator";
import AppError from "src/shared/core/errors/AppError";
import { IBaseKeycloakPayload } from "src/shared/core/interfaces/keycloak/baseKeycloakPayload.interface";
import { ICreateNewUser } from "src/shared/core/interfaces/keycloak/createNewUser.interface";
import { IKeycloakUser } from "src/shared/core/interfaces/keycloak/keycloakUser.interface";
import { ISetupNewPassword } from "src/shared/core/interfaces/keycloak/setupNewPassword.interface";

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state: string;
  scope: string;
}

@Injectable()
export class UserProvider {
  public axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  @RealmMaster()
  public async create(
    payload: IKeycloakUser,
    realm: string
  ): Promise<any> {
    const realmTarget = realm || process.env.REALM;
   
    const credentials = [
      {
        type:"password",
        value: payload.password,
        temporary:false
      }
    ];

    payload['credentials'] = credentials;
    payload.enabled = true;
    payload.emailVerified = true;

    // @ts-expect-error 
    delete payload.password;
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.KEYCLOAK_URL}/admin/realms/${realmTarget}/users`,
      method: "POST",
      data: payload,
      timeout: 120000
    } as AxiosRequestConfig;

    return this.axios
      .request(requestConfig)
      .then((result) => {
        console.log("User: " + result);
        return result;
      })
      .catch((error) => {
        throw new AppError(error.message, {
          status: error.response ? error.response.status : 403,
          keycloak_error: error?.response?.data.error_description || "",
        });
      });
  }

  @RealmMaster()
  public async sendEmailVerification(
    payload: IBaseKeycloakPayload
  ): Promise<TokenResponse> {
    const realmTarget = payload?.realm || process.env.REALM;
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.KEYCLOAK_URL}/admin/realms/${realmTarget}/users/${payload.userId}/send-verify-email`,
      method: "PUT",
    } as AxiosRequestConfig;

    return this.axios
      .request(requestConfig)
      .then((result) => {
        console.log("User: " + result);
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
  public async logoutUser(
    payload: IBaseKeycloakPayload
  ): Promise<TokenResponse> {
    const realmTarget = payload?.realm || process.env.REALM;
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.KEYCLOAK_URL}/admin/realms/${realmTarget}/users/${payload.userId}/logout`,
      method: "POST",
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
  public async setUpNewPassword(
    payload: ISetupNewPassword
  ): Promise<TokenResponse> {
    const realmTarget = payload?.realm || process.env.REALM;
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.KEYCLOAK_URL}/admin/realms/${realmTarget}/users/${payload.userId}/reset-password`,
      method: "PUT",
      data: {
        type: 'password',
        value: payload.newPassword,
        temporary: false
      }
    } as AxiosRequestConfig;

    return this.axios
      .request(requestConfig)
      .then((result) => {
        console.log("User: " + result);
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
