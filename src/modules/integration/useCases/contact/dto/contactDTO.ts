import { IContact } from "src/shared/core/interfaces/contact.interface";
import { IContract } from "src/shared/core/interfaces/contract.interface";

export interface IContactRequestDTO {
    name: string;
    mail: string;
    subject: string;
    message: string;
  }
  
export interface IContactResponseDTO{
    name: string;
    mail: string;
    subject: string;
    message: string;
}