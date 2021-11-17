import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public, Resource } from 'nest-keycloak-connect';
import { BaseController } from 'src/shared/core/BaseController';
import AppError from 'src/shared/core/errors/AppError';
import { CreateNewServiceUseCase } from '../useCases/service/createNewServiceUseCase';
import { IServiceResponseDTO } from '../useCases/service/dto/serviceDTO';
import { FindAllServicesUseCase } from '../useCases/service/findAllServicesUseCase';
import { FindServiceByIdUseCase } from '../useCases/service/findServiceByIdUseCase';
import { CreateNewServiceValidation } from './validations/createNewServiceValidation';


@ApiTags('service')
@Controller('service')
@Resource('service')
export class ServicesController extends BaseController {
  constructor(private creteNewServiceUseCase: CreateNewServiceUseCase,
    private finAllServicesUseCase: FindAllServicesUseCase,
    private findServiceByIdUseCase: FindServiceByIdUseCase) {
    super();
  }

  @Post()
  @Public()
  async newMessage(
    @Res() res: Response,
    @Body() dto: CreateNewServiceValidation,
  ) {
    this.creteNewServiceUseCase
      .execute(dto)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }

  @ApiOperation({ summary: "Get All Services" })
  @ApiResponse({ status: 200, description: "Get All Services." })
  @Public()
  @Get()
  async getServices(): Promise<IServiceResponseDTO[]> {
    return this.finAllServicesUseCase.execute();
  }

  @ApiOperation({ summary: "Get Service by ID" })
  @ApiResponse({ status: 204, description: "Get Service by ID." })
  @ApiResponse({ status: 404, description: "Not found" })
  @Public()
  @Get(":id")
  async getScope(@Query("id") id: string): Promise<IServiceResponseDTO> {
    try {
      return await this.findServiceByIdUseCase.execute(id);
    } catch (e) {
      throw new AppError('Erro');
    }
  }
}
