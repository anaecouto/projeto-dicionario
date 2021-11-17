import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class IGetTokenKeycloakDTO {
  
  
  @ApiProperty()
  @IsString()
  username: string;
  
  @ApiProperty()
  @IsString()
  password: string;
  
  @ApiProperty()
  @IsString()
  realm?: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  clientId?: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  clientSecret?: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  grantType?: string;

}
