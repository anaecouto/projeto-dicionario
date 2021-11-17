import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';


interface TokenPayload {
    userId: {
      value: string
    },
    roles: string[],
    iat: number
}
@Injectable()
export class RolesGuard implements CanActivate {
  jwtService = new JwtService({});
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const [, token] = authHeader.split(' ');
    try{
        const decoded = this.jwtService.decode(token);
        
        const tokenPayload = decoded as TokenPayload;
        const hasRole = () =>
          tokenPayload.roles.some(role => !!roles.find(item => item === role));
    
        return tokenPayload && tokenPayload.roles && hasRole();
    } catch (err) {
        throw new Error('Invalid JWT token');
    }
  }
}