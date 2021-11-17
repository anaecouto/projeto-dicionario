import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class NexoosBorrowerValidation{
    @ApiProperty()
    @IsOptional()
    metadata: any;
 
}