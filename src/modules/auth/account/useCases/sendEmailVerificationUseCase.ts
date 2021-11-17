import { Inject, Injectable, Scope } from "@nestjs/common";
import { IKeycloakUser } from "src/shared/core/interfaces/keycloak/keycloakUser.interface";
import { IUseCase } from "src/shared/core/IUseCase";
import { UserProvider } from "../providers/user.provider";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { IBaseKeycloakPayload } from "src/shared/core/interfaces/keycloak/baseKeycloakPayload.interface";

@Injectable({ scope: Scope.REQUEST })
@Injectable()
export class SendEmailVerificationUseCase implements IUseCase<any, any> {
  constructor(
    @Inject(REQUEST) private request: Request,
    @Inject(UserProvider) private userProvicer: UserProvider
  ) {}

  async execute(request: IBaseKeycloakPayload): Promise<any> {
    const realm = this.request?.headers["realm"] as string;
    return await this.userProvicer.sendEmailVerification(request);
  }
  

}
