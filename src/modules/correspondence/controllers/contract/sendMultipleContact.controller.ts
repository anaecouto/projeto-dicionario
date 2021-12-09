import { Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public, Resource } from 'nest-keycloak-connect';
import { BaseController } from 'src/shared/core/BaseController';
import { SendMultipleContactUseCase } from '../../useCases/sendMultipleContactUseCase';

@ApiTags('contract/whatsapp/multiple')
@Controller('contract/whatsapp/multiple')
@Resource('contract/whatsapp/multiple')
export class SendMultipleWhatsappContactController extends BaseController {
  constructor(private sendMultipleContactUseCase: SendMultipleContactUseCase) {
    super();
  }

  @Post()
  @Public()
  async newMessage(
    @Res() res: Response
  ) {
    this.sendMultipleContactUseCase
      .execute()
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }
}
