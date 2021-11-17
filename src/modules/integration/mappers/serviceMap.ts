import { IService } from "src/shared/core/interfaces/service.interface";
import { UniqueEntityID } from "src/shared/domain/UniqueEntityID";
import { ServiceEntity } from "src/shared/infra/database/typeorm/entities/service.entity";
import { DeepPartial } from "typeorm";
import { Service, ServiceProps } from "../domain/service/Service";
import { SubServiceMapper } from "./subServiceMap";

export class ServiceMapper {
  static toDomain(dbService: ServiceEntity): Service {
    const serviceProps = {
      title: dbService.title,
      serviceKey: dbService.serviceKey,
      icon: dbService.icon,
      sequence: dbService.sequence,
      description: dbService.description,
      subServices: dbService.subServices,
    } as ServiceProps;

    return Service.create(serviceProps, UniqueEntityID.create(dbService._id));
  }

  static toPersistence(
    service: Service
  ): DeepPartial<ServiceEntity> {
    const subServicesInterface = service.subServices.map((item) =>{
      return SubServiceMapper.toDto(item);
    });
    return {
      _id: service.id.toValue(),
      title: service.title,
      serviceKey: service.serviceKey,
      icon: service.icon,
      sequence: service.sequence,
      description: service.description,
      subServices: subServicesInterface,
    };
  }

  static toDto(dbService: Service): IService {
    return {
      title: dbService.title,
      serviceKey: dbService.serviceKey,
      icon: dbService.icon,
      sequence: dbService.sequence,
      description: dbService.description,
      subServices: dbService.subServices,
    }
  }
}
