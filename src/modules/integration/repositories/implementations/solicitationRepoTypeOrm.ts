import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/shared/core/base.repository";
import { SolicitationStatusEnum } from "src/shared/core/enums/solicitationStatus.enum";
import { SolicitationEntity } from "src/shared/infra/database/typeorm/entities/solicitation.entity";
import { DateUtils } from "src/shared/utils/DateUtils";
import {
  Between,
  FindManyOptions,
  LessThanOrEqual,
  MongoRepository,
  MoreThanOrEqual,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { Solicitation } from "../../domain/solicitation/Solicitation";
import { SolicitationMapper } from "../../mappers/solicitationMap";
import { ISolicitationRepo } from "../solicitationRepo.interface";

@Injectable()
export class SolicitationRepoTypeOrm extends BaseRepository<SolicitationEntity> implements ISolicitationRepo {
  constructor(
    @InjectRepository(SolicitationEntity)
    private solicitationTypeOrmRepo: MongoRepository<SolicitationEntity>
  ) {
    super(solicitationTypeOrmRepo);
  }

  async save(solicitation: Solicitation): Promise<Solicitation> {
    const solicitationDb = SolicitationMapper.toPersistence(solicitation);
    console.log("---------> before save solicitation: ", solicitationDb);
    const solicitationEntity = await this.solicitationTypeOrmRepo.save(
      solicitationDb
    );
    console.log("---------> after save solicitation:", solicitationEntity);
    return SolicitationMapper.toDomain(solicitationEntity);
  }

  // async findAll(): Promise<Solicitation[]> {
  //   const found = await this.solicitationTypeOrmRepo.find();

  //   return found.map((item) => {
  //     return SolicitationMapper.toDomain(item);
  //   });
  // }

  async findById(id: string): Promise<Solicitation | undefined> {
    const solicitationEntity = await this.solicitationTypeOrmRepo.findOne(id);
    if (solicitationEntity)
      return SolicitationMapper.toDomain(solicitationEntity);

    return undefined;
  }

  async findByExternalId(
    externalId: string
  ): Promise<Solicitation | undefined> {
    const solicitationEntity = await this.solicitationTypeOrmRepo.findOne({
      externalId: externalId,
    });
    if (solicitationEntity)
      return SolicitationMapper.toDomain(solicitationEntity);

    return undefined;
  }

  async updateExternalId(
    solicitationId: string,
    externalId: string
  ): Promise<void> {
    const solicitationEntity = await this.solicitationTypeOrmRepo.update(
      solicitationId,
      { externalId }
    );
  }

  async findLostSolicitationCreatedTodayByCnpj(
    cnpj: string
  ): Promise<Solicitation | undefined> {
    const date = new Date();
    const today = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0
    );
    const solicitationEntityList = await this.solicitationTypeOrmRepo.find({
      where: {
        status: SolicitationStatusEnum.LOST,
        createdAt: {
          $gte: today,
        },
        "metadata.borrower.cnpj": cnpj,
      },
    });
    if (solicitationEntityList.length) {
      return SolicitationMapper.toDomain(solicitationEntityList[0]);
    }
    return undefined;
  }

  async count(relations: ObjectLiteral): Promise<number> {
    return await this.solicitationTypeOrmRepo.count(relations);
  }

  async getSolicitationAmountSumByStatus(status: SolicitationStatusEnum): Promise<any> {
    const result = await this.solicitationTypeOrmRepo
      .aggregate([
        {
          $match: {
            "status": status,
          }
        },
        { $group: { _id: null, sum: { $sum: "$amount" } } },
      ])
      .next();

    return result ? result.sum : 0;
  }
}
