import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { SolicitationStatusEnum } from "src/shared/core/enums/solicitationStatus.enum";
import { SolicitationEntity } from "src/shared/infra/database/typeorm/entities/solicitation.entity";
import { FindManyOptions, FindOneOptions, ObjectLiteral, UpdateResult } from "typeorm";
import { Solicitation } from "../domain/solicitation/Solicitation";

export interface ISolicitationRepo {
  save(solicitation: Solicitation): Promise<Solicitation>;
  findById(id: string): Promise<Solicitation | undefined>;
  findByExternalId(externalId: string): Promise<Solicitation | undefined>;
  updateExternalId(solicitationId: string, externalId: string): Promise<void>;
  findLostSolicitationCreatedTodayByCnpj(cpnj: string): Promise<Solicitation | undefined>;
  count(relations: ObjectLiteral): Promise<number>;
  getSolicitationAmountSumByStatus(status: SolicitationStatusEnum): Promise<any>;

  paginate(options: IPaginationOptions, relations: any): Promise<Pagination<SolicitationEntity>>
  findOne(
    relations: string | FindOneOptions<SolicitationEntity>
  ): Promise<SolicitationEntity | undefined>;

  findAll(relations: FindManyOptions<SolicitationEntity>): Promise<SolicitationEntity[] | undefined>;

  update(entityId: string, entity: SolicitationEntity): Promise<UpdateResult>;

  count(relations: FindManyOptions<SolicitationEntity>): Promise<number>;
}
