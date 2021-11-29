import { Module } from "@nestjs/common";
import { MessagesModule } from "./modules/messages/messages.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { IntegrationModule } from "./modules/integration/integration.module";
import { AuthModule } from "./modules/auth/auth.module";
import { FilesModule } from "./modules/files/file.module";
import { ConfigModule } from "@nestjs/config";
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard, TokenValidation } from "nest-keycloak-connect";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    MessagesModule,
    NotificationsModule,
    IntegrationModule,
    AuthModule,
    FilesModule,
    // KeycloakConnectModule.register({
    //   authServerUrl: 'https://keycloak.gocash.com.br/auth',
    //   realm: 'bandigital',
    //   clientId: 'backoffice-cli',
    //   secret: '3dba6fec-6c34-4234-b9d1-adc81b3b0e0e',
    //   cookieKey: 'KEYCLOAK_JWT',
    //   realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg9y8YkDsakx+Cbc7tXSOP+JxVBJ8777la/QHb6ScseHDjF3xnhIq9+Yl7kvnhHqETYa6tbPOnElPZ6sDrPlQ8GJbbBUWaJas/eDXEV9Mj4mYD98RAg99Wio40hiFt+t/a4jjfMLZizuCEbFGiMVmM/nqH0w7XLNUv96Th3/yGOTnPUaPZ24iSAvjbzjjOsFbVPcbsjEb59S+gV2TMtM89v0ZymfK8MZcaS0v3iNZiWljD1IE433dRqzK3XODJpbOYj3D3WH8oC7y4Zq973kV1+EHSiFhxpZB6vHDV9bG2ttpwjS7u2hLqSwUM1gMrjL/CHHBI6MDhYsTuo2MJe7SRwIDAQAB', 
    //   tokenValidation: TokenValidation.OFFLINE
    // }) 
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: ResourceGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
  ]
})
export class AppModule {}
