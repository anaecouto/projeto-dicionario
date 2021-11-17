import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/shared/core/IUseCase';

@Injectable()
export class SendWelcomeEmailUseCase implements IUseCase<any, void> {
  execute(request?: any): void {
    console.log('ENVIANDO EMAIL DE BOAS VINDAS PARA ', request.name.value);
  }
}
