import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "eventemitter2";
import { IZapi } from "src/shared/core/interfaces/zapiContact.interface";
import { IUseCase } from "src/shared/core/IUseCase";
import { ContractEntity } from "src/shared/infra/database/typeorm/entities/contract.entity";
import { PhoneUtils } from "src/shared/utils/PhoneUtils";
import { ZapiProvider } from "../providers/implementation/zapi.provider";

@Injectable()
export class SendMultipleWhatsappMessagesUseCase implements IUseCase<any, any> {
  constructor(
    @Inject(ZapiProvider)
    private provider: ZapiProvider,
    private eventEmitter: EventEmitter2
  ) {}

  async execute(payload: ContractEntity[]): Promise<any> {
    if (payload && payload.length > 0) {
      const contracts = await Promise.all(
        payload.map(async (contract) => {
          const phones = PhoneUtils.foundWhatsappPhone(contract.phones);
          if (phones && phones.length > 0) {
            await this.firstMessage(contract, phones[0]);
            await this.secondMessage(contract, phones[0]);
            await this.thirdMessage(contract, phones[0]);
            await this.fourthMessage(contract, phones[0]);
            this.eventEmitter.emit("update.contract.whatsapp.contact", {  
              contractId: contract._id,
              phone: phones[0],
              message: ''
            } as IZapi);
            return contract;
          }
        })
      );
    }
    return null;
  }

  private async firstMessage(contract: ContractEntity, phone: string) {
    const name = this.getName(contract);
    const message = `Olá, ${name} tudo bem?`;
    const result = await this.provider.sendWhatsapp(phone, message);
  }

  private async secondMessage(contract: ContractEntity, phone: string) {
    const message = `Somos a Mais BB Digital. Verificamos que você possui crédito disponivel.🤑`;
    const result = await this.provider.sendWhatsapp(phone, message);
  }

  private async thirdMessage(contract: ContractEntity, phone: string) {
    const message = `Consigo simular aqui para você sem compromisso, tem interesse?`;
    const result = await this.provider.sendWhatsapp(phone, message);
  }

  private async fourthMessage(contract: ContractEntity, phone: string) {
    const message = this.getOptions(contract);
    const result = await this.provider.sendWhatsapp(phone, message);
  }

  private getOptions(contract: ContractEntity) {
    const amount = contract.options[0].alternatives[0].fullPrice;
    const installments = contract.options[0].alternatives[0].times;
    const modalidade = this.normalizeOption(contract.options[0].title);
    return `São ${amount} em até ${installments} vezes através do ${modalidade} para você.😱😱😱`;
  }

  private getName(contract: ContractEntity): string {
    return (
      contract.name[0].toUpperCase() + contract.name.substring(1).toLowerCase()
    ).split(" ")[0];
  }

  private normalizeOption(option: string): string {
    const split = option.split(" ");
    const result = split.map((element) => {
      if (element === "BB") return element;

      let newPalavra = element.toLowerCase();
      newPalavra =
        newPalavra[0].toUpperCase() + newPalavra.substring(1).toLowerCase();
      return newPalavra;
    });
    return result ? result.join(" ") : "";
  }
}
