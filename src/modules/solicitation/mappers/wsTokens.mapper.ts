import { IWsToken } from 'src/shared/core/interfaces/wsToken.interface';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { WsTokensEntity } from 'src/shared/infra/database/typeorm/entities/wsToken.entity';
import { DeepPartial } from 'typeorm';
import { WsToken, WsTokenProps } from '../domain/wsToken/WsToken';

export class WsTokensMapper {
  static toDomain(token: WsTokensEntity): WsToken {
    const tokenProps = {
      companyKey: token.companyKey,
      token: token.token,
      expiresIn: token.expiresIn,
      tokenDateHour: token.tokenDateHour,
    } as WsTokenProps;
    return WsToken.create(tokenProps, UniqueEntityID.create(token._id));
  }

  static toPersistence(token: WsToken): DeepPartial<WsTokensEntity> {
    return {
      _id: token.id.toValue(),
      token: token.token,
      companyKey: token.companyKey,
      expiresIn: token.expiresIn,
      tokenDateHour: token.tokenDateHour,
    };
  }

  static toDto(token: WsToken): IWsToken {
    return {
      companyKey: token.companyKey,
      token: token.token,
      tokenDateHour: token.tokenDateHour,
      expiresIn: token.expiresIn
    };
  }
}
