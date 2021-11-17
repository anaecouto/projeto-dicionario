import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IContact } from "src/shared/core/interfaces/contact.interface";

export class ContactValidation
  implements IContact {

    @ApiProperty()
    @IsOptional()
    name: string;
    
    @ApiProperty()
    @IsOptional()
    mail: string;
    
    @ApiProperty()
    @IsOptional()
    subject: string;
    
    @ApiProperty()
    @IsOptional()
    message: string;
 
}