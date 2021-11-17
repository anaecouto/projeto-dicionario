import { Inject, Injectable } from '@nestjs/common';
import { ServiceMapper } from '../../mappers/serviceMap';
import { ServiceRepoTypeOrm } from '../../repositories/implementations/serviceRepoTypeOrm';
import { IServiceRepo } from '../../repositories/serviceRepo.interface';
import { IServiceResponseDTO } from './dto/serviceDTO';

@Injectable()
export class FindAllServicesUseCase {
  constructor(@Inject(ServiceRepoTypeOrm) private serviceRepo: IServiceRepo) {}

  async execute(): Promise<IServiceResponseDTO[]> {
    const services = await this.serviceRepo.findAll();
    return services.map((element) => {
      ;return ServiceMapper.toDto(element);
    })
  }
}
