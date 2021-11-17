import { BadRequestException, HttpException, RequestTimeoutException } from "@nestjs/common";
import e from "express";

export interface ErrorProps {
  statusCode: number;
  message: string[];
  error: string;
}

export default class BaseProviderError extends Error {
  public data: ErrorProps;

  constructor(exception: any = {}) {
    super(exception.message || 'Erro na integração com Provider');
    this.data = {
      statusCode: 500,
      message: [],
      error: ''
    };
  }
}
