import { SolicitationOriginEnum } from "src/shared/core/enums/solicitationOrigin.enum";
import { SolicitationStatusEnum } from "src/shared/core/enums/solicitationStatus.enum";
import { SolicitationTypeEnum } from "src/shared/core/enums/solicitationType.enum";
export interface IPersonDTO {
  name: string;
  documentNumber: string;
  phoneNumber: string;
  birthDate: string;
  address: IAddressDTO;
  email: string;
}

export interface IAddressDTO {
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  streetNumber: string;
  zipCode: string;
  complement: string;
}

export interface IContractDTO {
  totalAmount: number;
  profitTax: number;
  profitTotalAmount: number;
}

export interface ICreateNewSolicitationRequestDTO {
  person?: IPersonDTO;
  status?: SolicitationStatusEnum;
  contract?: IContractDTO;
  origin?: SolicitationOriginEnum;
  type?: SolicitationTypeEnum;
  serviceKey: string;
  subServiceKey: string;
  companyKey: string;
  amount: string;
  productKey: string;
  metadata: Object;
  roomId?: string;
}

export interface ISolicitationResponseDTO {
  person?: IPersonDTO;
  status?: SolicitationStatusEnum;
  contract?: IContractDTO;
  origin?: SolicitationOriginEnum;
  type?: SolicitationTypeEnum;
}
