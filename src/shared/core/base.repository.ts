import {
  IPaginationOptions,
  paginate,
  Pagination,
} from "nestjs-typeorm-paginate";
import {
  FindManyOptions,
  FindOneOptions,
  MongoRepository,
  UpdateResult,
} from "typeorm";
import { DateUtils } from '../utils/DateUtils';

export class BaseRepository<T> {
  protected readonly repository: MongoRepository<T>;

  public constructor(repository: MongoRepository<T>) {
    this.repository = repository;
  }
  async paginate(options: IPaginationOptions, relations: any): Promise<Pagination<T>> {
    console.log(options);
    let clone = JSON.parse(JSON.stringify(relations));
    this.formatRelations(clone);
    return paginate<T>(this.repository, options, clone);
  }

  async findOne(relations: string | FindOneOptions<T>): Promise<T | undefined> {
    return this.repository.findOne(relations);
  }

  async findAll(relations: any): Promise<T[] | undefined> {
    let clone = JSON.parse(JSON.stringify(relations));
    this.formatRelations(clone);
    const result = await this.repository.find(clone);
    return result;
  }

  async update(entityId: string, entity: T): Promise<UpdateResult> {
    return this.repository.update(entityId, entity);
  }

  async count(relations: FindManyOptions<T>): Promise<number> {
    return this.repository.count(relations);
  }

  async findByDate(initDate: Date, finalDate: Date): Promise<T[]> {
    const result = await this.repository.find({
      where: {
        createdAt: {
          $gte: initDate,
          $lte: finalDate,
        },
      },
    });
    return result;
  }

  private formatRelations(object: any): any {
    if (object) {
      if (typeof object === "object") {
        Object.keys(object).map((key) => {
          let value = object[key];
          if (typeof value === "object") {
            this.formatRelations(value);
          } else {
            if (typeof value === "string") {
                const parsedDate = DateUtils.convertStringToDate(value);
                object[key] = parsedDate || value;
            }
          }
        })
      }
    }
  }
}
