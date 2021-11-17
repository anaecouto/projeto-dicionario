import { Module } from "@nestjs/common";
import { DomainEvents } from "./domain/events/DomainEvents";
import DomainsEventBootstrap from "./domain/events/DomainEventsBootstrap";
import { TypeOrmModule as DataBaseModule } from "./infra/database/typeorm/typeorm.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "./infra/database/typeorm/entities/message.entity";
import { SenderEntity } from "./infra/database/typeorm/entities/sender.entity";
import { SolicitationEntity } from "./infra/database/typeorm/entities/solicitation.entity";
import { ServiceEntity } from "./infra/database/typeorm/entities/service.entity";
import { WsTokensEntity } from "./infra/database/typeorm/entities/wsToken.entity";
import { ContactEntity } from "./infra/database/typeorm/entities/contact.entity";
import { CompanyEntity } from "./infra/database/typeorm/entities/company.entity";
import { UserEntity } from "./infra/database/typeorm/entities/user.entity";
import S3StorageProvider from "./providers/storageProvider/implementations/S3StorageProvider";
import { AccountEntity } from "./infra/database/typeorm/entities/account.entity";
import { BaseRepository } from "./core/base.repository";


@Module({
  imports: [
    DataBaseModule,
    // toda nova entidade deve ser registrada aqui, devido a limitações do typeOrm para injeção de repositories
    TypeOrmModule.forFeature([
      AccountEntity,
      CompanyEntity,
      ContactEntity,
      MessageEntity,
      SenderEntity,
      ServiceEntity,
      SolicitationEntity,
      UserEntity,
      WsTokensEntity,
    ]),
  ],
  providers: [DomainEvents, DomainsEventBootstrap, S3StorageProvider, BaseRepository],
  exports: [DomainEvents, TypeOrmModule, DataBaseModule],
})
export class SharedModule {}
