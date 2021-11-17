import { BadRequestException, HttpException, RequestTimeoutException } from "@nestjs/common";
import e from "express";

export interface ErrorProps {
  status: number;
  [key: string]: any;
}

export default class ProviderError extends Error {
  public readonly data: ErrorProps;

  constructor(exception: any = {}, data: any = {}) {
    if(exception.response) {
      super(exception.response.statusText || 'Erro na integração com Provider');
      this.data = exception.response.data;
      this.data.status = exception.response.status || 500;
    } else if(exception.message && exception.message.includes('timeout')) {
        super(exception.message);
        this.data = data;
        this.data.status = 504;
        this.data.message = exception.message || '';
    } else {
      super(exception.message);
        this.data = data;
        this.data.status = 500;
        this.data.message = exception.message || '';
    }
  }
}
