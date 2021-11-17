import axios, { AxiosRequestConfig } from "axios";
import { stringify } from "querystring";
import AppError from "../errors/AppError";

export function RealmMaster() {
  return (target: any, propertyKey: any, descriptor: any) => {
    const originalMethod = descriptor.value;
    const newDescriptor = { ...descriptor };

    newDescriptor.value = async function (...args: any[]) {
      const body = {
        username: process.env.MASTER_USERNAME || "",
        password: process.env.MASTER_PASSWORD || "",
        grant_type: "password",
        client_id: process.env.MASTER_CLIENT_ID || "",
        scope: "openid",
      };

      const requestConfig = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        url: `${process.env.KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`,
        method: "POST",
        data: stringify(body),
      } as AxiosRequestConfig;

      await axios
        .request(requestConfig)
        .then((result) => {
          this.axios.defaults.headers.common.Authorization = `Bearer ${result.data.access_token}`;
        })
        .catch((res) => {
          console.log(res);
          return Promise.reject(
            new AppError(
              "Não foi possível obter o token master. Verifique suas credenciais",
              {
                status: res.response ? res.response.status : 403,
                keycloak_error: res?.response?.data.error_description || '',
              }
            )
          );
        });
      return originalMethod.apply(this, args);
    };

    return newDescriptor;
  };
}
