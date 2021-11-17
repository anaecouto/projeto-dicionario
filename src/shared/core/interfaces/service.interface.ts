import { ISubService } from "./subService.interface";

export interface IService {
  title: string;
  serviceKey: string;
  icon?: string; 
  sequence?: number;
  description?: string;
  subServices: ISubService[]
}
