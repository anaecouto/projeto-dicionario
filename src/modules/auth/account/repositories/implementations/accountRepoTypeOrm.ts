import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/shared/core/base.repository";
import { AccountTypeEnum } from "src/shared/core/enums/accountType.enum";
import { AccountEntity } from "src/shared/infra/database/typeorm/entities/account.entity";
import { MongoRepository, Repository } from "typeorm";
import { IAccountRepo } from "../accountRepo.interface";

@Injectable()
export class AccountRepoTypeOrm
  extends BaseRepository<AccountEntity>
  implements IAccountRepo
{
  constructor(
    @InjectRepository(AccountEntity)
    private accountTypeOrmRepo: MongoRepository<AccountEntity>
  ) {
    super(accountTypeOrmRepo);
  }

  async save(account: AccountEntity): Promise<AccountEntity> {
    const createdAccount = this.accountTypeOrmRepo.create(account);
    return await this.accountTypeOrmRepo.save(createdAccount);
  }

  async update(accountId: string, entity: AccountEntity): Promise<any> {
    const update = await this.accountTypeOrmRepo.update(accountId, entity);
    return update;
  }

  async countAllRoot(): Promise<number> {
    return await this.accountTypeOrmRepo.manager
    .getMongoRepository(AccountEntity).count({ "settings.type": "ROOT"});
  }

  async findAccountByKey(
    key: string | undefined
  ): Promise<AccountEntity | undefined> {
    return await this.accountTypeOrmRepo.findOne({
      where: {
        "settings.accountKey": key,
      },
    });
  }

  async findAccountByKeyAndType(
    key: string | undefined,
    type: AccountTypeEnum
  ): Promise<AccountEntity | undefined> {
    return await this.accountTypeOrmRepo.findOne({
      where: {
        "settings.accountKey": key,
        "settings.type": type,
      },
    });
  }

  async findOneAccountByType(
    type: AccountTypeEnum | undefined
  ): Promise<AccountEntity | undefined> {
    return await this.accountTypeOrmRepo.findOne({
      where: {
        "settings.type": type,
      },
    });
  }

  async findAccountByTypeAndAccountKeyAndProductKey(
    type: AccountTypeEnum | undefined,
    accountKey: string,
    productKey: string
  ): Promise<any | undefined> {
    return await this.accountTypeOrmRepo
      .aggregate([
        {
          $match: {
            "settings.type": type,
            "settings.accountKey": accountKey,
            "settings.split.productKey": productKey,
          }
        },
        {
          $project: {
             result: {
                $filter: {
                   input: "$settings.split",
                   as: "item",
                   cond: { $eq: [ "$$item.productKey", productKey ] }
                }
             },
             _id: 0
          }
       },
      ]).next();
  }
}
