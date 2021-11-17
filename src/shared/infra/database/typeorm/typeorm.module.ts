import { Module } from '@nestjs/common';
import { TypeOrmModule as TypeOrm } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SenderSubscriber } from './hooks/senderEntityHook';
import { SolicitationSubscriber } from './hooks/solicitationEntityHook';
import { ContactSubscriber } from './hooks/contactEntityHook';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrm.forRoot({
      useUnifiedTopology: true,
      type: 'mongodb',
      url:  process.env.TYPEORM_URL,
      synchronize: true,
      entities: ['dist/**/*.entity{ .ts,.js}'],
      autoLoadEntities: true,
      migrations: [process.env.TYPEORM_MIGRATIONS as string],
      cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
        entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
      },
    }),
  ],
  providers: [SenderSubscriber, SolicitationSubscriber, ContactSubscriber],
  exports: [TypeOrm],
})
export class TypeOrmModule {}
