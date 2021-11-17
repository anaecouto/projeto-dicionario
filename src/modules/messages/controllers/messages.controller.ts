import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'nest-keycloak-connect';
import { BaseController } from 'src/shared/core/BaseController';
import { CreateNewMessagesUseCase } from '../useCases/createNewMessagesUseCase';
import { SendMailUseCase } from '../useCases/sendMailUseCase';
import { CreateNewMessagesValidation } from './validations/createNewMessagesValidation';

@Controller('message')
export class MessagesController extends BaseController {
  constructor(private createNewMessagesUseCase: CreateNewMessagesUseCase,
    private sendMailUseCase: SendMailUseCase) {
    super();
  }

  @Post('new')
  @ApiExcludeEndpoint()
  async newMessage(
    @Res() res: Response,
    @Body() dto: CreateNewMessagesValidation,
  ) {
    console.log('CHEGOU AQUI!!!!!');
    this.createNewMessagesUseCase
      .execute(dto)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }

  @Post('sendmail')
  @Public()
  @ApiExcludeEndpoint()
  async sendMail(
    @Res() res: Response
  ) {
    this.sendMailUseCase
      .execute()
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }
}
