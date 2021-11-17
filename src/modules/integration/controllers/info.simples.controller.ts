import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Inject,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BaseController } from "src/shared/core/BaseController";
import { ExecuteInfoSimplesDetranRequestUseCase } from "../useCases/executeInfoSimplesDetranRequest";

@ApiTags("infosimples")
@Controller("infosimples")
export class InfoSimplesController extends BaseController {
  constructor(
    private infoSimplesDetranUseCase: ExecuteInfoSimplesDetranRequestUseCase
  ) {
    super();
  }

  @ApiOperation({ summary: "Get vehicle details by parameters." })
  @ApiResponse({
    status: 200,
    description: "Get vehicle details by parameters.",
  })
  @Get("detran")
  async detranRequest(
    @Query('placa') placa: string,
    @Query('renavam') renavam: string,
    @Query('chassi') chassi: string,
    @Query('state') state: string
  ) {
    console.log("INFO SIMPLES DENTRAN CONTROLLER");

    const result = await this.infoSimplesDetranUseCase.executeRequest({
      placa, renavam, chassi,state
    });
    console.log("DEPOIS DA REQUISIÇÃO INFOSIMPLES DETRAN");
    return result;
  }
}


// {	
// 	"placa": "AAS6431", 
// 	"renavam": "00523843720",
// 	"chassi": "",
// 	"state": "go"
// }