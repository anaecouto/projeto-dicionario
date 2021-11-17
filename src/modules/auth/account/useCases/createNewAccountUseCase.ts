import { Inject, Injectable, Scope } from "@nestjs/common";
import { IKeycloakUser } from "src/shared/core/interfaces/keycloak/keycloakUser.interface";
import { IUseCase } from "src/shared/core/IUseCase";
import { UserProvider } from "../providers/user.provider";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { ICreateNewUser } from "src/shared/core/interfaces/keycloak/createNewUser.interface";
import { AccountRepoTypeOrm } from "../repositories/implementations/accountRepoTypeOrm";
import { AccountTypeEnum } from "src/shared/core/enums/accountType.enum";
import {
  AccountEntity,
  Person,
} from "src/shared/infra/database/typeorm/entities/account.entity";
import { v4 as uuidv4 } from "uuid";
import AppError from "src/shared/core/errors/AppError";
import { BaseUseCase } from "src/shared/core/baseUseCase";

@Injectable({ scope: Scope.REQUEST })
@Injectable()
export class CreateNewAccountUseCase extends BaseUseCase<AccountEntity> implements IUseCase<any, any> {
  constructor(
    @Inject(REQUEST) private request: Request,
    @Inject(UserProvider) private userProvicer: UserProvider,
    @Inject(AccountRepoTypeOrm) private accountRepo: AccountRepoTypeOrm
  ) {
    super(accountRepo)
  }

  async execute(payload: ICreateNewUser): Promise<any> {
    const account = await this.buildAccountEntity(payload);
    const accountSaved: AccountEntity = await this.accountRepo.save(account);

    const keycloakResult = await this.userProvicer.create(
      this.buildKeycloakUser(payload),
      payload.realm
    );
    accountSaved.owner.userId = this.getKeycloakUserId(keycloakResult);
    await this.accountRepo.update(accountSaved._id.toHexString(), accountSaved);
    return accountSaved;
  }

  async countRoot(): Promise<number> {
    return await this.accountRepo.countAllRoot();
  }

  private buildKeycloakUser(payload: ICreateNewUser) {
    const keyCloakUser = {
      username: payload.user.email,
      password: payload.user.password,
      email: payload.user.email,
      firstName: payload.user.name,
      realmRoles: payload.user.realmRoles,
    } as IKeycloakUser;
    return keyCloakUser;
  }

  private async buildAccountEntity(payload: ICreateNewUser) {
    await this.verifySubEstablishedOrSellerKey(payload);
    let uuid = uuidv4();
    const member = {
      name: payload.user.name,
      email: payload.user.email,
      documentNumber: payload.user.documentNumber,
      phoneNumber: payload.user.phoneNumber,
      birthDate: payload.user.birthDate,
      address: payload.user.address,
      userId: uuid,
    } as Person;

    const settings = {
      type: payload.settings?.type || AccountTypeEnum.USER,
      accountKey: payload.settings?.accountKey,
      split: payload.settings?.split,
    };

    const account = {
      owner: member,
      realm: payload.realm,
      settings,
    } as AccountEntity;

    return account;
  }

  private async verifySubEstablishedOrSellerKey(payload: ICreateNewUser) {
    if (
      payload.settings.type === AccountTypeEnum.SUB_ESTABLISHED ||
      payload.settings.type === AccountTypeEnum.SELLER
    ) {
      if (!payload.settings?.accountKey)
        throw new AppError(
          "O atributo accountKey é obrigatório para a criação de uma conta do tipo Subestabelecido ou Vendedor.",
          { status: 400 }
        );
      const foundAccount = await this.accountRepo.findAccountByKey(
        payload.settings.accountKey
      );
      if (foundAccount) {
        throw new AppError(`Chave de conta já existente. Já exsite uma conta relacionada à chave passada como parâmetro.`, { status: 400 });
      }
    }
  }
  
  private getKeycloakUserId(keycloakResult: any): string {
    const keycloakHeaders = keycloakResult?.headers["location"];
    return keycloakHeaders ? keycloakHeaders.split("/").pop() : "";
  }
}
