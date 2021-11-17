import { WsToken } from '../domain/wsToken/WsToken';

export interface IWsTokensRepo {
  save(token: WsToken): Promise<WsToken>;
  findValidToken(companyKey: string): Promise<WsToken | undefined>;
  findTokenByCompanyKey(companyKey: string): Promise<WsToken | undefined>;
}
