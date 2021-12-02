import {
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Res,
} from "@nestjs/common";
import { Public } from "nest-keycloak-connect";
import { BaseUseCase } from "./baseUseCase";
import { Response } from "express";
import { BaseController } from "./BaseController";
import { FindManyOptions, FindOneOptions } from "typeorm";
import AppError from "./errors/AppError";

export abstract class BaseEntityController<T> extends BaseController {
  constructor(private baseUseCase: BaseUseCase<T>) {
    super();
  }

  @Get("paginate")
  @Public()
  async paginated(
    @Res() res: Response,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query("relations", new DefaultValuePipe({})) relations: string
  ) {
    const isEmpty = Object.keys(relations).length === 0;
    this.baseUseCase
      .paginate(page, limit, isEmpty ? {} : JSON.parse(relations))
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }

  @Get("findById")
  @Public()
  async findById(
    @Res() res: Response,
    @Query("id", new DefaultValuePipe("")) id: string
  ) {
    if(!id) return this.ok(res, {});
 
    try {
      this.baseUseCase
      .findOne(id)
      .then((result) => {
        this.ok(res, result || {});
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
    } catch(error) {
      console.log(error);
      this.handleAppError(res, error);
    } 
  }

  @Get("findOne")
  @Public()
  async findOne(
    @Res() res: Response,
    @Query("relations", new DefaultValuePipe({})) relations: string
  ) {
    try {
      this.baseUseCase
      .findOne(JSON.parse(relations) as FindOneOptions<T>)
      .then((result) => {
        this.ok(res, result || {});
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
    } catch(error) {
      console.log(error);
      this.handleAppError(res, error);
    } 
  }

  @Get("findAll")
  @Public()
  async findAll(
    @Res() res: Response,
    @Query("relations", new DefaultValuePipe({})) relations: string
  ) {
    try {
      const isEmpty = Object.keys(relations).length === 0;
      this.baseUseCase
      .findAll(isEmpty ? {} :JSON.parse(relations))
      .then((result) => {
        this.ok(res, result || {});
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
    } catch(error) {
      console.log(error);
      this.handleAppError(res, error);
    } 
  }


  @Get("update")
  @Public()
  async update(
    @Res() res: Response,
    @Query("relations", new DefaultValuePipe({})) relations: string
  ) {
    try {
      this.baseUseCase
      .findAll(JSON.parse(relations) as FindOneOptions<T>)
      .then((result) => {
        this.ok(res, result || {});
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
    } catch(error) {
      console.log(error);
      this.handleAppError(res, error);
    } 
  }

  @Get("count")
  @Public()
  async count(
    @Res() res: Response,
    @Query("relations", new DefaultValuePipe({})) relations: string
  ) {
    try {
      this.baseUseCase
      .count(JSON.parse(relations) as FindOneOptions<T>)
      .then((result) => {
        this.ok(res, result || {});
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
    } catch(error) {
      console.log(error);
      this.handleAppError(res, error);
    } 
  }
  
}
