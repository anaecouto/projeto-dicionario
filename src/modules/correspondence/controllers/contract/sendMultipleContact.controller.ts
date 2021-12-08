import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public, Resource } from 'nest-keycloak-connect';
import { BaseController } from 'src/shared/core/BaseController';
import { UpdateContratDetailsPayload } from 'src/shared/core/interfaces/updateContractDetailsPayload';
import { IContractDetails } from 'src/shared/infra/database/typeorm/entities/contract.entity';
import { SaveContractDetailsUseCse } from '../../useCases/saveContractDetailsUseCase';

@ApiTags('contract/details')
@Controller('contract/details')
@Resource('contract/details')
export class SaveContractDetailsController extends BaseController {
  constructor(private saveContractDetailsUseCse: SaveContractDetailsUseCse) {
    super();
  }

  @Post()
  @Public()
  async newMessage(
    @Res() res: Response,
    @Body() dto: UpdateContratDetailsPayload,
  ) {
    this.saveContractDetailsUseCse
      .execute(dto)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }

}
