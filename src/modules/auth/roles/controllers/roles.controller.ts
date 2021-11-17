import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Public } from "nest-keycloak-connect";
import { BaseController } from "src/shared/core/BaseController";
import AppError from "src/shared/core/errors/AppError";
import { IRole } from "src/shared/core/interfaces/keycloak/role.interface";
import { AddRealmRoleToUserUseCase } from "../useCases/addRealmRoleToUserUseCase";
import { GetAllRolesForRealmUseCase } from "../useCases/getAllRolesForRealmUseCase";
import { GetRoleByNameUseCase } from "../useCases/getRoleByNameUseCase";

@ApiTags("role")
@Controller("role")
export class RolesController extends BaseController {
  constructor(
    private getAllRolesUseCase: GetAllRolesForRealmUseCase,
    private getRoleByNameUseCase: GetRoleByNameUseCase,
    private addRealmRoleToUserUseCase: AddRealmRoleToUserUseCase,
  ) {
    super();
  }
  
  @Public()
  @Get('getRolesByName/:realm/:role')
  async getRoleByName(@Param('realm') realm: string,@Param('role') roleName: string): Promise<IRole> {
    try {
      return await this.getRoleByNameUseCase.execute({realm, roleName});
    } catch (e) {
      throw new AppError('Erro');
    }
  }

  @Public()
  @Get('getAllRolesForRealm/:realm')
  async getScope(@Param('realm') realm: string): Promise<IRole[]> {
    try {
      return await this.getAllRolesUseCase.execute(realm);
    } catch (e) {
      throw new AppError('Erro');
    }
  }


  @Post('addRoleToUser')
  @Public()
  async createNewUser(@Res() res: Response, @Body() payload: any) {
    this.addRealmRoleToUserUseCase
      .execute(payload)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }
}
