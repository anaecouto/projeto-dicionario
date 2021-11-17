import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Public } from "nest-keycloak-connect";
import { BaseController } from "src/shared/core/BaseController";
import { UpdateStatusBizCapitalSolcitationUseCase } from "../useCases/solicitation/updateStatusBizSolicitationUseCase";
import { UpdateStatusEasyCreditoSolcitationUseCase } from "../useCases/solicitation/updateStatusEasyCreditoSolicitationUseCase";
import { BizCapitalWebhookValidation } from "./validations/bizcapitalWebhook.validation";

@ApiTags("webhook")
@Controller("webhook")
export class WebhookController extends BaseController {
  constructor(
    private updateStatusBizCapitalSolcitationUseCase: UpdateStatusBizCapitalSolcitationUseCase,
    private updateStatusEasyCreditoSolcitationUseCase: UpdateStatusEasyCreditoSolcitationUseCase,
  ) {
    super();
  }

  @Post("bizcapital")
  @ApiExcludeEndpoint()
  @Public()
  async webhookBizCapital(
    @Res() res: Response,
    @Body() dto: BizCapitalWebhookValidation
  ) {
    console.log("BIZ CAPITAL WEBHOOK", dto);
    this.updateStatusBizCapitalSolcitationUseCase.updateStatus(dto);
    console.log("DEPOIS DE ATUALIZAR A SOLICITAÇÃO BIZ CAPITAL...");
    return res.status(HttpStatus.OK).send();
  }

  @Post("easycredito")
  @ApiExcludeEndpoint()
  @Public()
  async webhookEasyCredito(
    @Res() res: Response, 
    @Body() dto: any
  ) {
    console.log("EASY CREDITO WEBHOOK", dto);   
    this.updateStatusEasyCreditoSolcitationUseCase.updateStatus(dto);
    console.log("DEPOIS DE ATUALIZAR A SOLICITAÇÃO EASY CREDITO...");
    return res.status(HttpStatus.OK).send();
  }

  @Post("nexoos")
  @ApiExcludeEndpoint()
  @Public()
  async webhookNexoos(
    @Res() res: Response, 
    @Body() dto: any
  ) {
    console.log("NEXOOS WEBHOOK", dto);
    return res.status(HttpStatus.OK).send();
  }
}
