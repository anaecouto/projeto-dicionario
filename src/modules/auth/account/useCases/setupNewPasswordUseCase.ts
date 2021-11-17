import { Inject, Injectable, Scope } from "@nestjs/common";
import { IUseCase } from "src/shared/core/IUseCase";
import { UserProvider } from "../providers/user.provider";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { ISetupNewPassword } from "src/shared/core/interfaces/keycloak/setupNewPassword.interface";

@Injectable({ scope: Scope.REQUEST })
@Injectable()
export class SetupNewPasswordUseCase implements IUseCase<any, any> {
  constructor(
    @Inject(REQUEST) private request: Request,
    @Inject(UserProvider) private userProvicer: UserProvider
  ) {}

  async execute(request: ISetupNewPassword): Promise<any> {
    return await this.userProvicer.setUpNewPassword(request);
  }
}
