import { Inject, Injectable } from "@nestjs/common";
import { ServiceMapper } from "../../mappers/serviceMap";
import { ServiceRepoTypeOrm } from "../../repositories/implementations/serviceRepoTypeOrm";
import { IServiceRepo } from "../../repositories/serviceRepo.interface";
import { IServiceResponseDTO } from "./dto/serviceDTO";

@Injectable()
export class FindServiceByIdUseCase {
  constructor(
    @Inject(ServiceRepoTypeOrm) private serviceRepo: IServiceRepo
  ) {}

  async execute(id: string): Promise<IServiceResponseDTO> {
    const service = await this.serviceRepo.findById(id);
    return ServiceMapper.toDto(service);
  }
}
