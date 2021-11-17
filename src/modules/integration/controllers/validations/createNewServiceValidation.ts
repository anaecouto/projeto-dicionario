import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IServiceRequestDTO } from "../../useCases/service/dto/serviceDTO";
import { SubServiceValidation } from "./subService.validation";

export class CreateNewServiceValidation
  implements IServiceRequestDTO {

    @ApiProperty()
    @IsOptional()
    title: string;
    
    @ApiProperty()
    @IsOptional()
    serviceKey: string;
    
    @ApiProperty()
    @IsOptional()
    icon: string; 
    
    @ApiProperty()
    @IsOptional()
    sequence: number;
    
    @ApiProperty()
    @IsOptional()
    description: string;

    @ApiProperty({type: [SubServiceValidation]})
    @IsOptional()
    subServices: SubServiceValidation[]
    
}
