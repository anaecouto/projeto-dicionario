import { Inject, Injectable } from '@nestjs/common';
import { IBaseProvider } from '../baseProvider.interface';
import { ISolicitationProvider } from '../solicitation.provider';
import { BizCapitalProvider } from './bizCapital.provider';
import { EasyCreditoProvider } from './easyCredito.provider';
import { InfoSimplesProvider } from './infoSimples.provider';
import { MultiplikeProvider } from './multiplike.provider';
import { NexoosProvider } from './nexoos.provider';
import { VamosParcelarProvider } from './vamosParcelar.provider';

/**
 * @description Sempre que for criado um novo provider de veiculo (DetranUF, por exemplo),
 * adicionar a injeção desse provider no construtor da classe, para que o objeto seja
 * atributido ao contexto e seja possível recuperar com a chamada implementada
 */
@Injectable()
export class BaseProvider implements IBaseProvider {
  constructor(
    @Inject(BizCapitalProvider)
    private bizCapital: ISolicitationProvider,
    @Inject(EasyCreditoProvider)
    private easyCredito: ISolicitationProvider,
    @Inject(VamosParcelarProvider)
    private vamosParcelar: ISolicitationProvider,
    @Inject(NexoosProvider)
    private nexoos: ISolicitationProvider,
    @Inject(InfoSimplesProvider)
    private infoSimples: ISolicitationProvider,
    @Inject(MultiplikeProvider)
    private multiplike: ISolicitationProvider,
    
  ) {}

  chooseProvider(
    companyKey: string,
  ): ISolicitationProvider | undefined {
    return this[companyKey];
  }
}
