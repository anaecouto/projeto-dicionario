import {
  BadRequestException,
  DefaultValuePipe,
  Get,
  HttpException,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import * as express from "express";
import { Public } from "nest-keycloak-connect";
import { BaseRepository } from "./base.repository";
import AppError from "./errors/AppError";
import ProviderError from "./errors/ProviderError";

export abstract class BaseController<
  T,
  S extends BaseRepository<T>
> {
  constructor(protected repository: S) {
  }

  public static jsonResponse(
    res: express.Response,
    code: number,
    message: string
  ) {
    return res.status(code).json({ message });
  }

  @Get()
  @Public()
  async paginated(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ) {
    // this.repository.paginate()
  }

  public ok<T>(res: express.Response, dto?: T) {
    if (!!dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created(res: express.Response) {
    return res.sendStatus(201);
  }

  public clientError(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      400,
      message ? message : "Unauthorized"
    );
  }

  public unauthorized(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      401,
      message ? message : "Unauthorized"
    );
  }

  public paymentRequired(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      402,
      message ? message : "Payment required"
    );
  }

  public forbidden(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      403,
      message ? message : "Forbidden"
    );
  }

  public notFound(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      404,
      message ? message : "Not found"
    );
  }

  public conflict(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      409,
      message ? message : "Conflict"
    );
  }

  public tooMany(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      429,
      message ? message : "Too many requests"
    );
  }

  public todo(res: express.Response) {
    return BaseController.jsonResponse(res, 400, "TODO");
  }

  public fail(res: express.Response, error: Error | string) {
    return res.status(500).json({
      message: error.toString(),
    });
  }

  public handleAppError(res: express.Response, error: any) {
    if (error instanceof AppError) {
      return res.status(error.data.status).send(error.data);
    }

    if (error instanceof ProviderError) {
      return res.status(error?.data?.status || 500).send(error?.data);
    }

    if (error.response && error.response.message) {
      return res
        .status(error?.status ? error.status : 500)
        .json({ message: error.response });
    }
    return res.status(500).json({
      message: error?.toString(),
    });
  }
}
