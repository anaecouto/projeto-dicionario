import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { BizCapitalStatusEnum } from "src/shared/core/enums/bizStatus.enum";
import { IBizCapitalWebhook } from "src/shared/core/interfaces/bizcapitalWebhookResponse.interface";
import { BizCapitalProposalValidation } from "./bizcapitalProposal.validation";

export class BizCapitalWebhookValidation
  implements IBizCapitalWebhook {

    @ApiProperty()
    @IsOptional()
    id: string;
    @ApiProperty()
    @IsOptional()
    cnpj: string;
    @ApiProperty()
    @IsOptional()
    status: BizCapitalStatusEnum;
    @ApiProperty()
    @IsOptional()
    proposal: BizCapitalProposalValidation;
 
}