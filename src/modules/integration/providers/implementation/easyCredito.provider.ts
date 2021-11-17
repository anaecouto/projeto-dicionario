import { BadRequestException, HttpException, Inject, Injectable } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";
import { stringify } from "querystring";
import { SolicitationStatusEnum } from "src/shared/core/enums/solicitationStatus.enum";
import AppError from "src/shared/core/errors/AppError";
import ProviderError from "src/shared/core/errors/ProviderError";
import EasyCreditoProviderError from "src/shared/core/errors/providers/EasyCreditoProviderError";
import { IProposalEasy } from "src/shared/core/interfaces/easycreditoProposal.interface";
import { DateUtils } from "src/shared/utils/DateUtils";
import { GeolocalizationUtils } from "src/shared/utils/GeolocalizationUtils";
import { Company } from "../../domain/company/Company";
import { Solicitation } from "../../domain/solicitation/Solicitation";
import { WsToken } from "../../domain/wsToken/WsToken";
import { ICompanyRepo } from "../../repositories/companyRepo.interface";
import { CompanyRepoTypeOrm } from "../../repositories/implementations/companyRepoTypeOrm";
import { SolicitationRepoTypeOrm } from "../../repositories/implementations/solicitationRepoTypeOrm";
import { WsTokensRepoTypeOrm } from "../../repositories/implementations/wsTokensTypeOrm.repository";
import { ISolicitationRepo } from "../../repositories/solicitationRepo.interface";
import { IWsTokensRepo } from "../../repositories/wsTokensRepo.interface";
import { ISolicitationProvider } from "../solicitation.provider";

@Injectable()
export class EasyCreditoProvider implements ISolicitationProvider {

  constructor(
    @Inject(WsTokensRepoTypeOrm)
    private tokenRepo: IWsTokensRepo,
    @Inject(CompanyRepoTypeOrm)
    private companyRepo: ICompanyRepo,
    @Inject(SolicitationRepoTypeOrm)
    private solicitationRepo: ISolicitationRepo,
  ) {}

  async sendSolicitation(companyKey: string, solicitation: Solicitation): Promise<EasyCreditoResponse> {
    console.log('SEND SOLICITATION EASY: ', companyKey);
    const signUpRequest: SignUpMatchRequest = solicitation.metadata;
    
    let token = await this.tokenRepo.findValidToken(companyKey);
    
    console.log('-------------> TOKEN: ',token);
    const company = await this.companyRepo.findByCompanyKey(companyKey);
    console.log('-------------> COMPANY: ',company);
    if(!company) {
      throw new AppError('Não foi possível encontrar as configurações de company para a chave: ', companyKey);
    }
    
    if (!token) {
      const newToken = await this.token(company);
      console.log('TOKEN: ', token);
      token = await this.saveToken(newToken, companyKey);
    }

    const logData = this.buildLogData(solicitation);
    signUpRequest.logData = logData;
    console.log('---------------->ANTES DE CHARMAR SIGN UP MATCH: ', signUpRequest);
    
    const response: EasyCreditoResponse = await this.singUpMatch(signUpRequest, token.token, company);

    solicitation.externalId = response.id;
    solicitation.setStatus(SolicitationStatusEnum.PENDING);
    this.solicitationRepo.save(solicitation);

    return response;
  }

  private async token(company: Company): Promise<TokenEasyCredito> {
    const body = {
      grant_type: "client_credentials",
      client_id: company.credentials?.username,
      client_secret: company.credentials?.password,
    };

    const requestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: company.credentials?.baseUrl+"/oauth/token",
      method: "POST",
      data: stringify(body),
    } as AxiosRequestConfig;

    return axios
      .request(requestConfig)
      .then((result) => {
        console.log("TOKEN: "+ result);
        return result.data;
      })
      .catch((res) => {
        console.log(res);
      });
  }

  async saveToken(token: TokenEasyCredito, companyKey: string) {
    const validateToken = await this.createToken(token, companyKey);
    this.tokenRepo.save( validateToken);
    return validateToken;
  }

  async createToken(token: TokenEasyCredito, companyKey: string) {
    const tokenDateHour = new Date();
    const expirationSeconds = DateUtils.addSeconds(
      tokenDateHour,
      token.expires_in
    );
    const findedToken = await this.tokenRepo.findTokenByCompanyKey(companyKey);
    if(findedToken) {
      return WsToken.create({
        token: token.access_token,
        companyKey: companyKey,
        tokenDateHour,
        expiresIn: expirationSeconds,
      }, findedToken.id)
    }

    return WsToken.create({
      token: token.access_token,
      companyKey: companyKey,
      tokenDateHour,
      expiresIn: expirationSeconds,
    });
  }

  private async singUpMatch(request: SignUpMatchRequest, token: string, company: Company): Promise<EasyCreditoResponse>  {
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      url: company.credentials?.baseUrl+'/api/external/v2.1/process/signup',
      method: 'POST',
      data: request,
      timeout:  30000
    } as AxiosRequestConfig;
    console.log('---------------------> ANTES DO AXIOS REQUEST EASY!');
    return axios
      .request(requestConfig)
      .then((result) => {
        console.log('RESULTADO DA REQUEST EASY: ', result);
        return result.data;
      })
      .catch((err) => {
        console.log('ERRO AO EXECUTAR REQUEST PARA EASY singUpMatch: ', err);
        throw new EasyCreditoProviderError(err);
      });
  }

  async createProposal(request: IProposalEasy, company: Company): Promise<EasyCreditoResponse>  {
    let token = await this.tokenRepo.findValidToken(company.key);
    
    if (!token) {
      const newToken = await this.token(company);
      token = await this.saveToken(newToken, company.key);
    }
    
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
      },
      url: company.credentials?.baseUrl+'/api/external/v2.1/process/proposal/'+request.id,
      method: 'POST',
      data: request.metadata
    } as AxiosRequestConfig;

    return axios
      .request(requestConfig)
      .then((result) => {
        console.log('CRIOU PROPOSAL!');
        return result.data;
      })
      .catch((res) => {
        console.log('ERRO AO EXECUTAR REQUEST PARA EASY createProposal', res);
        throw new ProviderError(res);
      });
  }
  
  private buildLogData(solicitation: Solicitation) {
    const latLong = GeolocalizationUtils.getLatitudeLongitudeByIp(solicitation.person?.ip || '');
    
    return {
      latitude: (latLong.length === 2) ? Number(latLong[0]) : 0,
      longitude: (latLong.length === 2) ? Number(latLong[1]) : 0,
      occurrenceDate: new Date().toISOString(),
      userAgent: solicitation.person?.userAgent,
      ip: solicitation.person?.ip,
    } as LogData;
  }
}

interface TokenEasyCredito {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

interface EasyCreditoResponse {
  id: string,
  name: string,
  status: string,
  cpf: number,
  dateCreated: Date,
  lastUpdated: Date,
}
interface SignUpMatchRequest {
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
interface CreateProposalRequest {
    mother: string,
    gender: string,
    nationality: string,
    hometownState: string,
    hometown: string,
    education: string,
    relationshipStatus: string,
    identity: {
        type: string,
        number: string,
        issuer: string,
        state: string,
        issuingDate: string,
    },
    address: {
        zipCode: string,
        address: string,
        addressNumber: string,
        district: string,
        state: string,
        city: string,
        homeType: string,
        homeSince: string,
        complement: string,
    },
    business: {
        occupation: string,
        profession: string,
        payday: string,
        zipCode: string,
        address: string,
        addressNumber: string,
        district: string,
        state: string,
        city: string,
        companyName: string,
        phone: string,
        income: string,
        benefitNumber: string,
        complement: string,
    },
    bank: {
        bank: string,
        accountType: string,
        agency: string,
        account: string,
    },
    phoneLandline: string,
    vehicle: {
        licensePlate: string,
    },
    consumerUnit: {
        number: string,
    },
    reference: [
        {
            name: string,
            phone: string,
        },
        {
            name: string,
            phone: string,
        }
    ]
}

interface ProposalMock {
  "mother": "Fulana Mãe",
  "gender": "MASCULINO",
  "nationality": "BRASILEIRO",
  "hometownState": "GO",
  "hometown": "Goiânia",
  "education": "POS_GRADUACAO",
  "relationshipStatus": "CASADO",
  "phoneLandline": "6232345678",
  "identity": {
    "type": "RG",
    "number": "123456",
    "issuer": "SSP",
    "state": "GO",
    "issuingDate": "2010-01-01"
  },
  "address": {
    "zipCode": "74000000",
    "address": "Cidade de Goiânia",
    "number": 0,
    "complement": "toda a cidade",
    "district": "geral",
    "state": "GO",
    "city": "Goiânia",
    "homeType": "ALUGADA",
    "homeSince": "MAIOR_2_ANOS"
  },
  "vehicle": {
    "licensePlate": "XXX0000"
  },
  "consumerUnit": {
    "number": "000000000"
  },
  "business": {
    "occupation": "ASSALARIADO",
    "profession": "ADMINISTRADOR",
    "companyName": "Abobrinha",
    "phone": "6239413142",
    "income": 1500,
    "payday": 1,
    "benefitNumber": "",
    "zipCode": "74000000",
    "address": "Cidade de Goiânia",
    "number": 1,
    "complement": "toda a cidade",
    "district": "geral",
    "state": "GO",
    "city": "Goiânia"
  },
  "bank": {
    "bank": "001",
    "type": "CONTA_CORRENTE_INDIVIDUAL",
    "agency": "0001",
    "account": "5647891"
  },
  "reference": [
    {
      "name": "Joana Maria",
      "phone": "11987654321"
    }
  ],
  "products": [
    {
      "type": "LOAN",
      "value": "7000",
      "installments": 12
    },
    {
      "type": "CARD",
      "network": "MASTERCARD",
      "payDay": 15
    },
    {
      "type": "REFINANCING_AUTO",
      "value": "30000",
      "vehicleBrand": "Fiat",
      "vehicleModel": "Mobi",
      "installments": 12,
      "vehicleModelYear": "2010",
      "codeFipe": "038003-2",
      "vehicleFipeValue": "28000"
    },
    {
      "type": "REFINANCING_HOME",
      "value": "150000",
      "installments": 12,
      "realEstateType": "house",
      "realEstateValue": "148000",
      "outstandingBalance": "50000"
    }
  ]
}