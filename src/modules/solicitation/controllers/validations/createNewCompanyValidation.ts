import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import {
  CredentialsDTO,
  ICompanyRequestDTO,
} from "../../useCases/company/dto/companyDTO";

export class CreateNewCompanyValidation implements ICompanyRequestDTO {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  key: string;

  @ApiProperty()
  @IsOptional()
  siteUrl: string;

  @ApiProperty()
  @IsOptional()
  credentials?: CredentialsDTO;
}
