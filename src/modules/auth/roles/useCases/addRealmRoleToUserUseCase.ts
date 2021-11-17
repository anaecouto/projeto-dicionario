import { Inject, Injectable } from "@nestjs/common";
import { IRole } from "src/shared/core/interfaces/keycloak/role.interface";
import { IUseCase } from "src/shared/core/IUseCase";
import { RolesProvider } from "../providers/roles.provider";

@Injectable()
export class AddRealmRoleToUserUseCase implements IUseCase<any, any> {
  constructor(
    @Inject(RolesProvider)
    private rolesProvider: RolesProvider
  ) {}

  async execute(payload: any): Promise<any> {
    const role: IRole = await this.rolesProvider.getRoleByName(payload.realm, payload.roleName);
    await this.rolesProvider.addRealmRoleToUser(payload.realm, payload.userId, role);
  }
}
