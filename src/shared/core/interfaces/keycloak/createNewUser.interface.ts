import { AccountTypeEnum } from "../../enums/accountType.enum";
import { IAccountSettings } from "../accountSettings.interface";
import { IAddress } from "../address.interface";
import { IBaseKeycloakPayload } from "./baseKeycloakPayload.interface";

export interface ICreateNewUser extends IBaseKeycloakPayload {
  user: {
    name: string;
    email: string;
    password: string;
    documentNumber: string;
    phoneNumber: string;
    birthDate: Date;
    address: IAddress;
    attributes?: {};
    emailVerified?: boolean;
    requiredActions?: string[];
    clientRoles?: {};
    realmRoles?: string[];
  };  
  settings: IAccountSettings;
}
