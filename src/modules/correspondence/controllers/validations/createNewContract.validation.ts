import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";
import { IContract } from "src/shared/core/interfaces/contract.interface";

export class CreateNewContractValidation implements IContract {
  @ApiProperty()
  @IsString()
  agency: string;

  @ApiProperty()
  @IsString()
  account: string;

  @ApiProperty()
  @IsString()
  document: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsOptional()
  sex: string;

  @ApiProperty()
  @IsOptional()
  birthDate: Date;

  @ApiProperty()
  @IsArray()
  phones: string[];
}
