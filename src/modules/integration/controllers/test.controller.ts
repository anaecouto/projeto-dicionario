import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { ApiBody, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Resource, RoleMatchingMode, Roles, Scopes } from "nest-keycloak-connect";
import { BaseController } from "src/shared/core/BaseController";
import { CreateNewCompanyUseCase } from "../useCases/company/createNewCompanyUseCase";
import { CreateNewCompanyValidation } from "./validations/createNewCompanyValidation";

@ApiTags("test")
@Controller("/test")
@Resource('test')
export class TestController extends BaseController {
  constructor(private createNewCompanyUseCase: CreateNewCompanyUseCase) {
    super();
  }

  @Post()
  @ApiBody({ type: CreateNewCompanyValidation, required: true })
  @ApiResponse({ status: 200 })
  @ApiExcludeEndpoint()
  create(@Res() res: Response, @Body() dto: any) {
    console.log("RESPOSTA WEBHOOK VAMOS PARCELAR: ", dto);
    // this.ok(res, {message: "ok"});
  }

  @ApiOperation({ summary: "Get solicitation paginated" })
  @ApiResponse({ status: 200, description: "Get solicitation paginated." })
  // @Roles({ roles: ['realm:admin']})
  @Get("test")
  @ApiExcludeEndpoint()
  async getFile(@Req() req): Promise<any> {
    return { message: "ok" };
  }
}
