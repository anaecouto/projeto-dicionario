import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";
import { Public, Roles } from "nest-keycloak-connect";
import { Pagination } from "nestjs-typeorm-paginate";
import { BaseEntityController } from "src/shared/core/BaseEntityController";
import { SolicitationEntity } from "src/shared/infra/database/typeorm/entities/solicitation.entity";
import { SolicitationMapper } from "../mappers/solicitationMap";
import { SolicitationService } from "../services/implementations/solicitationServiceImpl";
import { CreateBorrowerNexoosUseCase } from "../useCases/solicitation/createBorrowerNexoosUseCase";
import { CreateEasyProposalUseCase } from "../useCases/solicitation/createEasyProposalUseCase";
import { CreateNewSolicitationUseCase } from "../useCases/solicitation/createNewSolicitationUseCase";
import { GetTotalizersUseCase } from "../useCases/solicitation/getTotalizersUseCase";
import { SendSolicitationToProviderUseCase } from "../useCases/solicitation/sendSolicitationToProviderUseCase";
import { CreateNewSolicitationValidation } from "./validations/createNewSolicitationValidation";
import { NexoosBorrowerValidation } from "./validations/nexoosBorrower.validation";
import { ProposalEasyValidation } from "./validations/proposal.easy.validation";
@ApiTags("solicitation")
@Controller("solicitation")
export class SolicitationsController extends BaseEntityController<SolicitationEntity> {
  constructor(
    private createNewSolicitationUseCase: CreateNewSolicitationUseCase,
    private createEasyProposalUseCase: CreateEasyProposalUseCase,
    private sendSolicitationToProviderUseCase: SendSolicitationToProviderUseCase,
    @Inject(SolicitationService)
    private solicitationService: SolicitationService,
    private createBorrowerNexoosUseCase: CreateBorrowerNexoosUseCase,
    private getTotalizersUseCase: GetTotalizersUseCase
  ) {
    super(createNewSolicitationUseCase);
  }

  @Public()
  @Post()
  @UseInterceptors(FilesInterceptor("files", 20))
  @ApiOperation({ summary: "Create new solicitation." })
  @ApiResponse({ status: 200, description: "Create new solicitation." })
  async newSolicitation(
    @Res() res: Response,
    @Body() dto: CreateNewSolicitationValidation,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    try {
      const solictation = await this.createNewSolicitationUseCase.execute(dto);
      const result = await this.sendSolicitationToProviderUseCase.execute(solictation, files);
      this.ok(res, SolicitationMapper.toDto(result));
    } catch (err) {
      this.handleAppError(res, err);
    }
  }

  @Post("proposal")
  @Public()
  @ApiOperation({ summary: "Create new proposal." })
  @ApiResponse({ status: 200, description: "Create new proposal." })
  async proposal(@Res() res: Response, @Body() dto: ProposalEasyValidation) {
    return await this.createEasyProposalUseCase
      .createProposal(dto)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }

  @Get("")
  @ApiOperation({ summary: "Get solicitation paginated" })
  @ApiResponse({ status: 200, description: "Get solicitation paginated." })
  @Public()
  async index(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ): Promise<Pagination<SolicitationEntity>> {
    limit = limit > 100 ? 100 : limit;
    console.log("PAGINATE");
    const paginate = await this.solicitationService.paginate({
      limit,
      page,
    });
    return paginate;
  }

  @Post("nexoosBorrower")
  @Public()
  @ApiExcludeEndpoint()
  async nexoosBorrower(
    @Res() res: Response,
    @Body() dto: NexoosBorrowerValidation
  ) {
    return await this.createBorrowerNexoosUseCase
      .createBorrower(dto.metadata)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }

  @Get("/totalizers")
  @ApiOperation({ summary: "Get solicitation paginated" })
  @ApiResponse({ status: 200, description: "Get solicitation paginated." })
  @Roles({ roles: ['realm:admin'] })
  async count(@Res() res: Response) {
    this.getTotalizersUseCase
      .execute()
      .then((result) => {
        this.ok(res, result || {});
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }
}
