import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { SolicitationEntity } from 'src/shared/infra/database/typeorm/entities/solicitation.entity';
import { ISolicitationService } from '../solicitationService.interface';
import { SolicitationStatusEnum } from 'src/shared/core/enums/solicitationStatus.enum';

@Injectable()
export class SolicitationService implements ISolicitationService{
  constructor(
    @InjectRepository(SolicitationEntity)
    private readonly repository: Repository<SolicitationEntity>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<SolicitationEntity>> {
    console.log(options);
    return paginate<SolicitationEntity>(this.repository, options);
  }


  async findLostSolicitationCreatedTodayByCnpj(
    cnpj: string
  ): Promise<SolicitationEntity | undefined> {
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    const solicitationEntityList = await this.repository.find({
      where: {
        status: SolicitationStatusEnum.LOST,
        createdAt: {
          $gte: today
      }, 
        "metadata.borrower.cnpj": cnpj,
      },
    });
    if (solicitationEntityList.length) {
      return solicitationEntityList[0];
    }
    return undefined;
  }
}