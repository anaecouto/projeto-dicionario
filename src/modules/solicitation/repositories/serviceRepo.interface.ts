import { Service } from "../domain/service/Service";

export interface IServiceRepo {
  save(service: Service): Promise<Service>;
  findAll(): Promise<Service[]>;
  findById(id: string): Promise<Service>;
}
