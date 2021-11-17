import { AccountTypeEnum } from "src/shared/core/enums/accountType.enum";
import { AccountEntity } from "src/shared/infra/database/typeorm/entities/account.entity";

export interface IAccountRepo {
  save(company: AccountEntity): Promise<AccountEntity>;

  update(accountId: string, entity: AccountEntity): Promise<any>;

  findAccountByKey(key: string | undefined): Promise<AccountEntity | undefined>;

  findAccountByKeyAndType(
    key: string | undefined,
    type: AccountTypeEnum
  ): Promise<AccountEntity | undefined>;

  findOneAccountByType(
    type: AccountTypeEnum | undefined
  ): Promise<AccountEntity | undefined>;

  findAccountByTypeAndAccountKeyAndProductKey(
    type: AccountTypeEnum | undefined,
    accountKey: string,
    productKey: string
  ): Promise<any | undefined>;
}
