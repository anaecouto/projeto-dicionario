import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Public } from "nest-keycloak-connect";
import { BaseController } from "src/shared/core/BaseController";
import { CreateNewContactUseCase } from "../useCases/contact/createNewContactUseCase";
import { ContactValidation } from "./validations/contact.validation";

@ApiTags('contact')
@Controller('contact')
export class ContactController extends BaseController {
    constructor(
        private createNewContactUseCase: CreateNewContactUseCase){
        super();
    }

    @Post()
    @ApiBody({ type: ContactValidation, required: true })
    @ApiResponse({ status: 200 })
    @Public()
    create(@Res() res: Response, @Body() dto: ContactValidation) {
      this.createNewContactUseCase
        .execute(dto)
        .then((result) => {
          this.ok(res, result);
        })
        .catch((err) => {
          this.handleAppError(res, err);
        });
    }
}