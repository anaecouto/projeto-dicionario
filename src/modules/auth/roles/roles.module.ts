import { Module } from "@nestjs/common";
import { RolesController } from "./controllers/roles.controller";
import { RolesProvider } from "./providers/roles.provider";
import { AddRealmRoleToUserUseCase } from "./useCases/addRealmRoleToUserUseCase";
import { GetAllRolesForRealmUseCase } from "./useCases/getAllRolesForRealmUseCase";
import { GetRoleByNameUseCase } from "./useCases/getRoleByNameUseCase";


@Module({
  imports: [],
  controllers: [RolesController],
  providers: [RolesProvider, GetAllRolesForRealmUseCase, GetRoleByNameUseCase, AddRealmRoleToUserUseCase],
})
export class RolesModule {}
