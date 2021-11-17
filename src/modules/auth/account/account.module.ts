import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { AccountController } from "./controllers/account.controller";
import { UserProvider } from "./providers/user.provider";
import { AccountRepoTypeOrm } from "./repositories/implementations/accountRepoTypeOrm";
import { CreateNewAccountUseCase } from "./useCases/createNewAccountUseCase";
import { LogoutUserUseCase } from "./useCases/logoutUserUseCase";
import { SendEmailVerificationUseCase } from "./useCases/sendEmailVerificationUseCase";
import { SetupNewPasswordUseCase } from "./useCases/setupNewPasswordUseCase";

@Module({
  imports: [
    SharedModule
  ],
  controllers: [AccountController],
  providers: [
    UserProvider,
    CreateNewAccountUseCase,
    SendEmailVerificationUseCase,
    LogoutUserUseCase,
    SetupNewPasswordUseCase,
    AccountRepoTypeOrm
  ],
})
export class AccountModule {}
