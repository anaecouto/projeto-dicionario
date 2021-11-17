import { CallHandler, ExecutionContext, Injectable, NestInterceptor, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

export const SolicitationContext = () => SetMetadata('solicitation-context', null);

@Injectable()
export class SolicitationContextInterceptor implements NestInterceptor {

  constructor(private reflector: Reflector) {

  }
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    return next.handle();
  }
}
