import { BadRequestException, HttpException, RequestTimeoutException } from "@nestjs/common";
import e from "express";
import { resourceUsage } from "process";
import { of } from "rxjs";
import BaseProviderError from "./BaseProviderError";

export interface ErrorProps {
  status: number;
  errors: string[];
}

export default class BizCapitalProviderError extends BaseProviderError {
  constructor(exception: any = {}, data: any = {}) {
    super(exception);
    if(exception.response) {
      try { 
        this.data.statusCode = exception.response.status || 500;
        this.data.message = this.data.message.concat(this.buildErros(exception.response.data))
        this.data.error = 'BizCaptial Provider Error!';
      } catch(err) {
        console.log(err);
      }
    } else {
      this.data.statusCode = 500;
      this.data.message = exception;
      this.data.error = 'BizCaptial Provider Error!';
    }
  }

  private buildErros(data: any): string[] {
    let result: string[] = [];
    if(typeof data === 'string') {
      return [data];
    } else if(typeof data === 'object') {
      Object.keys(data).map((key) => {
        let value = data[key];
        result.push(value as string);
      })
    } 
      return result;
  }
}
