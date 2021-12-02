import { Inject, Injectable } from '@nestjs/common';
import { IBaseProvider } from '../baseProvider.interface';
import { ISolicitationProvider } from '../solicitation.provider';


/**
 * @description Sempre que for criado um novo provider de veiculo (DetranUF, por exemplo),
 * adicionar a injeção desse provider no construtor da classe, para que o objeto seja
 * atributido ao contexto e seja possível recuperar com a chamada implementada
 */
@Injectable()
export class BaseProvider implements IBaseProvider {
  constructor() {}

  chooseProvider(
    companyKey: string,
  ): ISolicitationProvider | undefined {
    return this[companyKey];
  }
}
