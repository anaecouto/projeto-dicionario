import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public, Resource } from 'nest-keycloak-connect';
import { BaseController } from 'src/shared/core/BaseController';
import { BaseEntityController } from 'src/shared/core/BaseEntityController';
import { ContractEntity } from 'src/shared/infra/database/typeorm/entities/contract.entity';
import { CreateMultipleContractUseCase } from '../../useCases/createMultipleContractUseCase';
import { CreateNewContractUseCase } from '../../useCases/createNewContractUseCase';

import { CreateNewContractValidation } from './validations/createNewContract.validation';

@ApiTags('contract/multiple')
@Controller('contract/multiple')
@Resource('contract/multiple')
export class CreateMultipleContractController extends BaseController {
  constructor(private createMultipleContractController: CreateMultipleContractUseCase) {
    super();
  }

  @Post()
  @Public()
  async newMessage(
    @Res() res: Response,
    @Body() dto: CreateNewContractValidation[],
  ) {
    this.createMultipleContractController
      .execute(dto)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }

}
