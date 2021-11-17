import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import AfterSenderCreated from './subscriptions/afterSenderCreated';
import { SendWelcomeEmailUseCase } from './useCases/sendWelcomeEmail/sendWelcomeEmailUseCase';

@Module({
  imports: [SharedModule],
  providers: [AfterSenderCreated, SendWelcomeEmailUseCase],
})
export class NotificationsModule {}
