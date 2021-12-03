import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public, Resource } from 'nest-keycloak-connect';
import { BaseEntityController } from 'src/shared/core/BaseEntityController';
import { ContractEntity } from 'src/shared/infra/database/typeorm/entities/contract.entity';
import { CreateNewContractUseCase } from '../../useCases/createNewContractUseCase';

import { CreateNewContractValidation } from './validations/createNewContract.validation';

@ApiTags('contract')
@Controller('contract')
@Resource('contract')
export class CreateNewContractController extends BaseEntityController<ContractEntity> {
  constructor(private createNewContractUseCase: CreateNewContractUseCase) {
    super(createNewContractUseCase);
  }

  @Post()
  @Public()
  async newMessage(
    @Res() res: Response,
    @Body() dto: CreateNewContractValidation,
  ) {
    this.createNewContractUseCase
      .execute(dto)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }

}
