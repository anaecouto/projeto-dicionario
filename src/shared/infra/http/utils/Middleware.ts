import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class Middleware {
  public logger() {
    return async (req: Request, res: Response, next: NextFunction) => {
      console.info('[REQUEST] - IP', req.ip);
      next();
    };
  }
}
