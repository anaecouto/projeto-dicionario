import { Module } from "@nestjs/common";
import { AccessTokenController } from "./controllers/accessToken.controller";
import { AccessTokenProvider } from "./providers/accessToken.provider";
import { GetAccessTokenUseCase } from "./useCases/getAccessTokenUseCase";

@Module({
  imports: [],
  controllers: [AccessTokenController],
  providers: [AccessTokenProvider, GetAccessTokenUseCase],
})
export class AccessTokenModule {}
