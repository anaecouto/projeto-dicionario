import { IEmployer } from "./employer.interface";
import { IService } from "./service.interface";

export interface ISplitSettings {
  productKey: string,
  employer: IEmployer,
  services: IService[]
}
