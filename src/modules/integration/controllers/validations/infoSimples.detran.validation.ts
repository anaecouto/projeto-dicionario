import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
export class InfoSimplesDetranValidation {
    
  @ApiProperty()
    @IsOptional()
    placa: string; 
    
    @ApiProperty()
    @IsOptional()
    renavam: string;
    
    @ApiProperty()
    @IsOptional()
    chassi: string;
    
    @ApiProperty()
    @IsString()
    state: string;
}
