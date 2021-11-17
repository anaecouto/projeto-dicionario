import { IAddress } from "./address.interface";

export interface IPerson {
  name?: string;
  documentNumber?: string;
  phoneNumber?: string;
  birthDate?: string;
  address?: IAddress;
  email?: string;
  ip?: string;
  userAgent?: string;
  userId?: string;
}
