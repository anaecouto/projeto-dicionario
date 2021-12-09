import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { ObjectID } from 'mongodb';
import { ContractRepoTypeOrm } from 'src/modules/correspondence/repositories/implementations/ContractRepoTypeOrm';
import { IZapi } from 'src/shared/core/interfaces/zapiContact.interface';
import { IUseCase } from 'src/shared/core/IUseCase';
import { ContractEntity } from 'src/shared/infra/database/typeorm/entities/contract.entity';
import { ZapiProvider } from '../providers/implementation/zapi.provider';

@Injectable()
export class SendWhatsappMessagesUseCase
  implements
    IUseCase<any, any> {
  constructor(
  @Inject(ZapiProvider)
  private provider: ZapiProvider,
  private eventEmitter: EventEmitter2,
  private contractRepo: ContractRepoTypeOrm
  ) {}

  async execute(
    payload: IZapi,
  ): Promise<any> {
    const foundContract = await this.contractRepo.findOne({
      where:{
        _id: new ObjectID(payload.contractId)
      }
    }) as ContractEntity;

    // const result = await this.provider.sendWhatsapp(payload.phone, payload.message);
    await this.firstMessage(foundContract, payload);
    await this.secondMessage(foundContract, payload);
    await this.thirdMessage(foundContract, payload);
    await this.fourthMessage(foundContract, payload);

    this.eventEmitter.emit("update.contract.whatsapp.contact", payload);
    return null;
  }

  private async firstMessage(contract: ContractEntity, payload: IZapi) {
    const name = this.getName(contract);
    const message = `Olá, ${name} tudo bem?`;
    const result = await this.provider.sendWhatsapp(payload.phone, message);
  }

  private async secondMessage(contract: ContractEntity, payload: IZapi) {
    const message = `Somos a Mais BB Digital. Verificamos que você possui crédito disponivel.🤑`;
    const result = await this.provider.sendWhatsapp(payload.phone, message);
  }

  private async thirdMessage(contract: ContractEntity, payload: IZapi) {
    const message = `Consigo simular aqui para você sem compromisso, tem interesse?`;
    const result = await this.provider.sendWhatsapp(payload.phone, message);
  }

  private async fourthMessage(contract: ContractEntity, payload: IZapi) {
    const message = this.getOptions(contract);
    const result = await this.provider.sendWhatsapp(payload.phone, message);
  }

  private getOptions(contract: ContractEntity) {
    const amount = contract.options[0].alternatives[0].fullPrice;
    const installments = contract.options[0].alternatives[0].times;
    const modalidade = this.normalizeOption(contract.options[0].title);
     return `São ${amount} em até ${installments} vezes através do ${modalidade} para você.😱😱😱`
  }

  private getName(contract: ContractEntity): string {
    return (contract.name[0].toUpperCase() + contract.name.substring(1).toLowerCase()).split(" ")[0];
  }


  private normalizeOption(option: string): string {
    const split = option.split(' ');
    const result = split.map((element) => {
      if (element === "BB") return element;

      let newPalavra = element.toLowerCase();
      newPalavra =
        newPalavra[0].toUpperCase() + newPalavra.substring(1).toLowerCase();
      return newPalavra;
    });
    return result ? result.join(' ') : '';
  }
}
