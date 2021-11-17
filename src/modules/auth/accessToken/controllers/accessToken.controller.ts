import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'nest-keycloak-connect';
import { BaseController } from 'src/shared/core/BaseController';
import { IGetTokenKeycloakDTO } from '../dto/keycloakGetToken.dto';
import { GetAccessTokenUseCase } from '../useCases/getAccessTokenUseCase';



@ApiTags('auth')
@Controller('auth')
export class AccessTokenController extends BaseController {
  constructor(private getAccessTokenUseCase: GetAccessTokenUseCase,) {
    super();
  }
  
  @Post("token")
  @ApiOperation({ summary: "Get access token." })
  @ApiResponse({ status: 200, description: "Get access token." })
  @Public()
  async newMessage(
    @Res() res: Response,
    @Body() dto: IGetTokenKeycloakDTO,
  ) {
    this.getAccessTokenUseCase
      .execute(dto)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }
}
