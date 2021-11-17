import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/shared/core/IUseCase';
import { Service } from '../../domain/service/Service';
import { SubService } from '../../domain/service/SubService';
import { ServiceMapper } from '../../mappers/serviceMap';
import { ServiceRepoTypeOrm } from '../../repositories/implementations/serviceRepoTypeOrm';
import { IServiceRepo } from '../../repositories/serviceRepo.interface';
import { IServiceRequestDTO, IServiceResponseDTO } from './dto/serviceDTO';

@Injectable()
export class CreateNewServiceUseCase
  implements
    IUseCase<IServiceRequestDTO, IServiceResponseDTO> {
  constructor(@Inject(ServiceRepoTypeOrm) private serviceRepo: IServiceRepo) {}

  async execute(
    request: IServiceRequestDTO,
  ): Promise<IServiceResponseDTO> {
    const subServices =request.subServices.map((item) => {
      return SubService.create(item);
    });
    const service = Service.create({...request, subServices});
    return ServiceMapper.toDto(await this.serviceRepo.save(service));
  }
}
