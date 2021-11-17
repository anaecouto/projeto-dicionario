import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/shared/infra/database/typeorm/entities/service.entity';
import { Repository } from 'typeorm';
import { Service } from '../../domain/service/Service';
import { ServiceMapper } from '../../mappers/serviceMap';
import { IServiceRepo} from '../serviceRepo.interface';

@Injectable()
export class ServiceRepoTypeOrm implements IServiceRepo {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceTypeOrmRepo: Repository<ServiceEntity>,
  ) {}

  async save(service: Service): Promise<Service> {
    const serviceDb = ServiceMapper.toPersistence(service);
    const serviceEntity = await this.serviceTypeOrmRepo.save(serviceDb);
    return ServiceMapper.toDomain(serviceEntity);
  }

  async findAll(): Promise<Service[]> {
    const found = await this.serviceTypeOrmRepo.find();

    return found.map((item) => {
      return ServiceMapper.toDomain(item);
    });
  }

  async findById(id: string): Promise<Service> {
    const serviceEntity = await this.serviceTypeOrmRepo.findOne(id);
    if(serviceEntity) 
      return ServiceMapper.toDomain(serviceEntity);
    
    return ServiceMapper.toDomain(new ServiceEntity());
  }
}
