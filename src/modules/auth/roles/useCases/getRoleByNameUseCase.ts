import { Inject, Injectable } from "@nestjs/common";
import { IRole } from "src/shared/core/interfaces/keycloak/role.interface";
import { IUseCase } from "src/shared/core/IUseCase";
import { RolesProvider } from "../providers/roles.provider";

@Injectable()
export class GetRoleByNameUseCase implements IUseCase<any, any> {
  constructor(
    @Inject(RolesProvider)
    private rolesProvider: RolesProvider
  ) {}

  async execute(payload: any): Promise<IRole> {
    return await this.rolesProvider.getRoleByName(payload.realm, payload.roleName);
  }
}
