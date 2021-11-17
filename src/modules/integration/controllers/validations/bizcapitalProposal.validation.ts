import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IBizCapitalProposal } from "src/shared/core/interfaces/bizcapitalProposal.interface";

export class BizCapitalProposalValidation implements IBizCapitalProposal {

  @ApiProperty()
  @IsOptional()
  amount: number;

  @ApiProperty()
  @IsOptional()
  interestRate: number;

  @ApiProperty()
  @IsOptional()
  term: number;

  @ApiProperty()
  @IsOptional()
  url: string;
  
}
