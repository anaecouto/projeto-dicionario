import { Inject } from "@nestjs/common";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { BaseRepository } from "./base.repository";
import AppError from "./errors/AppError";

export class BaseUseCase<T> {
  constructor(
    @Inject(BaseRepository)
    private baseRepo: BaseRepository<T>
  ) {}

  async paginate(page: number, limit: number, relations: any): Promise<any> {
    return await this.baseRepo.paginate({
      limit,
      page,
    },
    relations);
  }

  async findOne(relations: string | FindOneOptions<T>): Promise<any> {
    return await this.baseRepo.findOne(relations);
  }

  async findAll(relations: any): Promise<any> {
    return await this.baseRepo.findAll(relations);
  }

  async count(relations: FindManyOptions<T>): Promise<any> {
    return await this.baseRepo.count(relations);
  }

  async findByDate(initDate: Date, finalDate: Date): Promise<T[]> {
    if(!initDate || !finalDate)
      throw new AppError('dateIni and dateEnd  must be a string.');
    return await this.baseRepo.findByDate(initDate, finalDate);
  }
}
