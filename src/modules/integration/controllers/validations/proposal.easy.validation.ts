import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class ProposalEasyValidation {

    @ApiProperty()
    @IsOptional()
    id: string;
  
    @ApiProperty()
    @IsOptional()
    metadata: any;
    
  }