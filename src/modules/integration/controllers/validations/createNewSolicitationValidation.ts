import { ApiProperty } from "@nestjs/swagger";
import { ObjectID } from "bson";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { SolicitationOriginEnum } from "src/shared/core/enums/solicitationOrigin.enum";
import { SolicitationStatusEnum } from "src/shared/core/enums/solicitationStatus.enum";
import { SolicitationTypeEnum } from "src/shared/core/enums/solicitationType.enum";
import {
  IContractDTO,
  ICreateNewSolicitationRequestDTO,
  IPersonDTO,
} from "../../useCases/solicitation/dto/createNewSolicitationDTO";
import { ContractValidation } from "./contract.validation";
import { PersonValidation } from "./person.validation";

export class CreateNewSolicitationValidation
  implements ICreateNewSolicitationRequestDTO {
  @ApiProperty()
  @IsOptional()
  person: PersonValidation;

  @ApiProperty()
  @IsOptional()
  status: SolicitationStatusEnum;

  @ApiProperty()
  @IsOptional()
  contract: ContractValidation;

  @ApiProperty()
  @IsOptional()
  origin: SolicitationOriginEnum;

  @ApiProperty()
  @IsOptional()
  type: SolicitationTypeEnum;

  @ApiProperty()
  @IsOptional()
  metadata: Object;

  @ApiProperty()
  @IsString()
  serviceKey: string;

  @ApiProperty()
  @IsString()
  subServiceKey: string;

  @ApiProperty()
  @IsString()
  productKey: string;

  @ApiProperty()
  @IsString()
  companyKey: string;

  @ApiProperty()
  @IsString()
  amount: string;

  @ApiProperty()
  @IsOptional()
  roomId: string;

}
