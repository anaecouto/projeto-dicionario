import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { SharedModule } from 'src/shared/shared.module';
import { AccessTokenModule } from './accessToken/accessToken.module';
import { AccountModule } from './account/account.module';
import { KeycloakProvider } from './provider/keycloak.provider';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    AccessTokenModule,
    AccountModule,
    RolesModule,
    PassportModule,
    SharedModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [JwtStrategy, KeycloakProvider],
})
export class AuthModule {}
