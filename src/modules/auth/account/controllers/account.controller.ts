import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Put, Query, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Public, Roles } from "nest-keycloak-connect";
import { BaseEntityController } from "src/shared/core/BaseEntityController";
import { AccountEntity } from "src/shared/infra/database/typeorm/entities/account.entity";;
import { BaseKeycloakDTO } from "../dto/baseKeycloakDTO";
import { CreateNewAccountDTO } from "../dto/createNewAccountDTO";
import { SetupNewPasswordDTO } from "../dto/setUpNewPasswordDTO";
import { CreateNewAccountUseCase } from "../useCases/createNewAccountUseCase";
import { LogoutUserUseCase } from "../useCases/logoutUserUseCase";
import { SendEmailVerificationUseCase } from "../useCases/sendEmailVerificationUseCase";
import { SetupNewPasswordUseCase } from "../useCases/setupNewPasswordUseCase";

@ApiTags("account")
@Controller("account")
export class AccountController extends BaseEntityController<AccountEntity> {
  constructor(
    private createNewAccountUseCase: CreateNewAccountUseCase,
    private sendEmailVerificationUseCase: SendEmailVerificationUseCase,
    private logoutUserUseCase: LogoutUserUseCase,
    private setupNewPasswordUseCase: SetupNewPasswordUseCase
  ) {
    super(createNewAccountUseCase);
  }


  @Post()
  @ApiOperation({ summary: "Create new User" })
  @ApiResponse({ status: 200, description: "Create new User" })
  @Public()
  async createNewUser(@Res() res: Response, @Body() dto: CreateNewAccountDTO) {
    this.createNewAccountUseCase
      .execute(dto)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }

  @Put("/send-email-verification")
  @ApiOperation({ summary: "Send new user e-mail verification." })
  @ApiResponse({ status: 200, description: "Send new user e-mail verification." })
  @Roles({ roles: ['realm:admin']})
  async sendEmailVerification(
    @Res() res: Response,
    @Body() dto: BaseKeycloakDTO
  ) {
    this.sendEmailVerificationUseCase
      .execute(dto)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }

  @Post("/logout-user")  
  @ApiOperation({ summary: "Logou user." })
  @ApiResponse({ status: 200, description: "Logou user." })
  @Public()
  async logoutUserVerification(
    @Res() res: Response,
    @Body() dto: BaseKeycloakDTO
  ) {
    this.logoutUserUseCase
      .execute(dto)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }

  @Put("/reset-password")
  @ApiOperation({ summary: "Reset user password." })
  @ApiResponse({ status: 200, description: "Reset user password." })
  @Public()
  async setUpNewPassword(
    @Res() res: Response,
    @Body() dto: SetupNewPasswordDTO
  ) {
    this.setupNewPasswordUseCase
      .execute(dto)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }


  @Get("countroot")
  @Public()
  async countEntity(
    @Res() res: Response,
    @Query("relations", new DefaultValuePipe({})) relations: string
  ) {
    try {
      this.createNewAccountUseCase
      .countRoot()
      .then((result) => {
        this.ok(res, result || {});
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
    } catch(error) {
      console.log(error);
      this.handleAppError(res, error);
    } 
  }
}
