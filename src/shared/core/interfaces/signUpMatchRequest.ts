export interface ISignUpMatchRequest {
  cpf: string,
  name: string,
  birthday: string,
  email: string,
  phone: string,
  zipCode: string,
  education: string,
  banks: string,
  occupation: string,
  income: number,
  hasCreditCard: boolean,
  hasRestriction: boolean,
  hasOwnHouse: boolean,
  hasVehicle: boolean,
  hasAndroid: boolean,
  products: [
    {
      type: string,
      value: string,
      installments: number
    },
    {
      type: string,
      network: string,
      payDay: number
    },
    {
      type: string,
      value: string,
      vehicleBrand: string,
      vehicleModel: string,
      installments: number,
      vehicleModelYear: string,
      codeFipe: string,
      vehicleFipeValue: string,
    },
    {
      type: string,
      value: string,
      installments: number,
      realEstateType: string,
      realEstateValue: string,
      outstandingBalance: string,
    }
  ],
  logData: LogData
}


interface LogData {
  latitude: number,
  longitude: number,
  occurrenceDate: string,
  userAgent: string,
  ip: string,
  mac?: string,
}