import { Inject } from "@nestjs/common";
import { IUseCase } from "src/shared/core/IUseCase";
import { ISolicitationRepo } from "../../repositories/solicitationRepo.interface";
import { SolicitationRepoTypeOrm } from "../../repositories/implementations/solicitationRepoTypeOrm";
import { ISetInvolvedSolicitationEvent } from "src/shared/core/interfaces/setInvolvedSolicitationEvent.interface";
import { AccountRepoTypeOrm } from "src/modules/auth/account/repositories/implementations/accountRepoTypeOrm";
import { IAccountRepo } from "src/modules/auth/account/repositories/accountRepo.interface";
import { AccountEntity } from "src/shared/infra/database/typeorm/entities/account.entity";
import AppError from "src/shared/core/errors/AppError";
import { ISolicitationSplit } from "src/shared/core/interfaces/solicitationSplit.interface";
import { Solicitation } from "../../domain/solicitation/Solicitation";
import { AccountTypeEnum } from "src/shared/core/enums/accountType.enum";
import { IService } from "src/shared/core/interfaces/service.interface";
import { ISubService } from "src/shared/core/interfaces/subService.interface";

export class SetSolicitationInvolvedUseCase
  implements IUseCase<ISetInvolvedSolicitationEvent, any>
{
  constructor(
    @Inject(SolicitationRepoTypeOrm)
    private solicitationRepo: ISolicitationRepo,
    @Inject(AccountRepoTypeOrm)
    private accoutnRepo: IAccountRepo
  ) {}

  async execute(payload: ISetInvolvedSolicitationEvent): Promise<any> {
    try {
      const solicitation: Solicitation | undefined =
        await this.solicitationRepo.findById(payload.solicitationId);
      if (solicitation) {
        const rootSplit = await this.getRootSplitPercentage(
          payload,
          solicitation
        );
        if (rootSplit) {
          let split: ISolicitationSplit[] = [];
          split.push(rootSplit);

          if (payload.subestablished) {
            const subEstablished: AccountEntity | undefined =
              await this.getInvolved(
                payload.subestablished,
                AccountTypeEnum.SUB_ESTABLISHED
              );
            if (subEstablished) {
              const subEstablishedSplit = await this.getSubEstablishedSplitPercentage(payload, solicitation.productKey, rootSplit, subEstablished);
              if(subEstablishedSplit) {
                split.push(subEstablishedSplit);
                await this.setSellerSplit(payload, solicitation, rootSplit, split, subEstablishedSplit);
              }
            }
          } else {
            if (payload.seller) {
              await this.setSellerSplit(payload, solicitation, rootSplit, split);
            }
          }
          solicitation.split = split;
          await this.solicitationRepo.save(solicitation);
        } else {
          throw new AppError(
            "Nenhum valor de split foi encontrado para a conta Root.",
            { status: 500 }
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  private async setSellerSplit(payload: ISetInvolvedSolicitationEvent,
    solicitation: Solicitation,
    rootSplit: ISolicitationSplit,
    split: ISolicitationSplit[],
    subEstablishedSplit?: ISolicitationSplit,
    ) {
      const seller: AccountEntity | undefined =
      await this.getInvolved(
        payload.seller,
        AccountTypeEnum.SELLER
      );
      if(seller) {
        const sellerSplit = await this.getSellerSplitPercentage(payload, solicitation.productKey, seller, rootSplit, subEstablishedSplit);
        if(sellerSplit) split.push(sellerSplit);
      }
  }

  private getSplitPercentaget(
    services: IService[],
    payload: ISetInvolvedSolicitationEvent
  ): number | undefined {
    const service: IService | undefined = services.find((element) => {
      return element.serviceKey === payload.serviceKey;
    });

    const subService: ISubService | undefined = service?.subServices.find(
      (element) => {
        return element.subServiceKey === payload.subServiceKey;
      }
    );

    const company = subService?.companies.find((element) => {
      return element.key === payload.companyKey;
    });
    return company?.splitPercentage;
  }

  private async getRootSplitPercentage(
    payload: ISetInvolvedSolicitationEvent,
    solicitation: Solicitation
  ): Promise<ISolicitationSplit | undefined> {
    const root = await this.accoutnRepo.findOneAccountByType(
      AccountTypeEnum.ROOT
    );
    if (!root) throw new AppError("Root account not found!", { status: 500 });
    const splitResult =
      await this.accoutnRepo.findAccountByTypeAndAccountKeyAndProductKey(
        AccountTypeEnum.ROOT,
        root?.settings.accountKey || "",
        solicitation.productKey
      );
    if (splitResult && splitResult.result && splitResult.result.length > 0) {
      const splitPercentage = this.getSplitPercentaget(
        splitResult.result[0].services,
        payload
      );
      if (splitPercentage)
        return {
          accountId: root._id.toHexString(),
          accountType: AccountTypeEnum.ROOT,
          accountKey: root.settings.accountKey || "bandigital",
          percentage: splitPercentage,
          calculatedAmount: solicitation.amount * splitPercentage,
        } as ISolicitationSplit;
    }

    return undefined;
  }

  private async getSubEstablishedSplitPercentage(
    payload: ISetInvolvedSolicitationEvent,
    productKey: string,
    rootSplit: ISolicitationSplit,
    subEstablished: AccountEntity
  ): Promise<ISolicitationSplit | undefined> {
    const splitResult =
      await this.accoutnRepo.findAccountByTypeAndAccountKeyAndProductKey(
        AccountTypeEnum.SUB_ESTABLISHED,
        payload.subestablished,
        productKey
      );
    if (splitResult && splitResult.result && splitResult.result.length > 0) {
      const splitPercentage = this.getSplitPercentaget(
        splitResult.result[0].services,
        payload
      );
      if (splitPercentage)
        return {
          accountId: subEstablished._id.toHexString(),
          accountType: AccountTypeEnum.SUB_ESTABLISHED,
          accountKey: payload.subestablished,
          percentage: splitPercentage,
          calculatedAmount: rootSplit.calculatedAmount * splitPercentage,
        } as ISolicitationSplit;
    }
    return undefined;
  }

  private async getSellerSplitPercentage(
    payload: ISetInvolvedSolicitationEvent,
    productKey: string,
    seller: AccountEntity,
    rootSplitPercentage: ISolicitationSplit,
    subEstablishedSplitPercentage?: ISolicitationSplit,
  ): Promise<ISolicitationSplit | undefined> {
    const splitResult =
      await this.accoutnRepo.findAccountByTypeAndAccountKeyAndProductKey(
        AccountTypeEnum.SELLER,
        payload.seller,
        productKey
      );
    if (splitResult && splitResult.result && splitResult.result.length > 0) {
      const splitPercentage = this.getSplitPercentaget(
        splitResult.result[0].services,
        payload
      );
      if (splitPercentage)
        return {
          accountId: seller._id.toHexString(),
          accountType: AccountTypeEnum.SELLER,
          accountKey: payload.seller,
          percentage: splitPercentage,
          calculatedAmount: subEstablishedSplitPercentage ? subEstablishedSplitPercentage.calculatedAmount * splitPercentage 
          : rootSplitPercentage.calculatedAmount * splitPercentage 
        } as ISolicitationSplit;
    }
    return undefined;
  }
  
  private async getInvolved(
    involvedKey: string,
    type: AccountTypeEnum
  ): Promise<AccountEntity | undefined> {
    if (!involvedKey) return undefined;

    const account = await this.accoutnRepo.findAccountByKeyAndType(
      involvedKey,
      type
    );
    return account;
  }
}
