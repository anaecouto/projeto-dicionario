import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseController } from 'src/shared/core/BaseController';
import { SendWhatsappMessagesUseCase } from '../useCases/sendWhatsappMessgeUseCase';

@Controller('whatsapp')
export class WhatsappController extends BaseController {
  constructor(private sendWhatsappMessagesUseCase: SendWhatsappMessagesUseCase) {
    super();
  }

  @Post('')
  @ApiExcludeEndpoint()
  async newWhatsappMessage(
    @Res() res: Response,
    @Body() dto: any,
  ) {
    console.log('SEND WHATSAPP');
    this.sendWhatsappMessagesUseCase
      .execute(dto)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }
}
