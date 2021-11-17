import { CashbackStatusEnum } from "../enums/cashbackStatusEnum";

export interface ICashback {
  originAmount: number,
  usedAmount: number,
  remainingAmount: number,
  status: CashbackStatusEnum,
}
