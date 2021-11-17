import { Inject, Injectable } from "@nestjs/common";
import { IGetTokenKeycloak } from "src/shared/core/interfaces/keycloak/keycloakGetToken.interface";
import { IUseCase } from "src/shared/core/IUseCase";
import { AccessTokenProvider } from "../providers/accessToken.provider";

@Injectable()
export class GetAccessTokenUseCase implements IUseCase<any, any> {
  constructor(
    @Inject(AccessTokenProvider)
    private accessTokenProvider: AccessTokenProvider
  ) {}

  async execute(request: IGetTokenKeycloak): Promise<any> {
    return await this.accessTokenProvider.token(request);
  }
}
