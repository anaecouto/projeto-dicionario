export interface ISignUpCallBack {
  id: string,
  status: string,
  cpf: number,
  name: string,
  dateCreated: string,
  lastUpdated: string,
  matches: Match[]
}

export interface Match {
  name?: string,
  maxValue?: number,
  maxInstallment?: number,
  monthlyTax?: number,
  minInstallment?: number,
  logo?: string,
  annuity?: number,
  network?: string,
}
