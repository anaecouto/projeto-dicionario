import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty, IsOptional, IsString } from "class-validator";

export class BaseKeycloakDTO {
  
  @IsString()
  @IsNotEmpty()
  realm: string;
  
  @IsString()
  @IsOptional()
  @ApiHideProperty()
  userId: string;
  
}
