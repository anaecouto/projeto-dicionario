import { IBaseKeycloakPayload } from "./baseKeycloakPayload.interface";

export interface ISetupNewPassword extends IBaseKeycloakPayload {
  newPassword: string;
}
