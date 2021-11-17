import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { BaseController } from "src/shared/core/BaseController";
import { CreateNewCompanyUseCase } from "../useCases/company/createNewCompanyUseCase";
import { CreateNewCompanyValidation } from "./validations/createNewCompanyValidation";

@ApiTags('company')
@Controller('company')
export class CompanyController extends BaseController {
    constructor(
        private createNewCompanyUseCase: CreateNewCompanyUseCase){
        super();
    }

    @Post()
    @ApiBody({ type: CreateNewCompanyValidation, required: true })
    @ApiResponse({ status: 200 })
    create(@Res() res: Response, @Body() dto: CreateNewCompanyValidation) {
      this.createNewCompanyUseCase
        .execute(dto)
        .then((result) => {
          this.ok(res, result);
        })
        .catch((err) => {
          this.handleAppError(res, err);
        });
    }
}