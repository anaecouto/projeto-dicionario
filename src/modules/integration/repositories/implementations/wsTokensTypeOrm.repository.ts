import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from 'src/shared/core/errors/AppError';
import { WsTokensEntity } from 'src/shared/infra/database/typeorm/entities/wsToken.entity';
import { Repository } from 'typeorm';
import { WsToken } from '../../domain/wsToken/WsToken';
import { WsTokensMapper } from '../../mappers/wsTokens.mapper';

import { IWsTokensRepo } from '../wsTokensRepo.interface';

@Injectable()
export class WsTokensRepoTypeOrm implements IWsTokensRepo {
  constructor(
    @InjectRepository(WsTokensEntity)
    private tokenTypeOrmRepo: Repository<WsTokensEntity>,
  ) {}

  async save(token: WsToken): Promise<WsToken> {
    const rawDocument = WsTokensMapper.toPersistence(token);
    const tokenEntity = await this.tokenTypeOrmRepo.save(rawDocument);
    if (!tokenEntity) {
      throw new AppError('Erro ao salvar token!');
    }
    return WsTokensMapper.toDomain(tokenEntity);
  }

  async findValidToken(companyKey: string): Promise<WsToken | undefined> {
    const token = await this.tokenTypeOrmRepo.findOne({
      where: {
        companyKey,
      },
    });
    return token && (!token.expiresIn || !this.isExpired(token))
      ? WsTokensMapper.toDomain(token)
      : undefined;
  }

  async findTokenByCompanyKey(companyKey: string): Promise<WsToken | undefined> {
    const token = await this.tokenTypeOrmRepo.findOne({
      where: {
        companyKey,
      },
    });
    return token ? WsTokensMapper.toDomain(token) : undefined;
  }

  private isExpired(token: WsTokensEntity): boolean {
    const SAFETY_TIME = 3;
    const nowDate = new Date();
    nowDate.setSeconds(nowDate.getSeconds() + SAFETY_TIME);
    return nowDate.getTime() >= token.expiresIn.getTime();
  }
}
