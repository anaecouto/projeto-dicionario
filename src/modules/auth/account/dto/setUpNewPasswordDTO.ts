import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { BaseKeycloakDTO } from "./baseKeycloakDTO";

export class SetupNewPasswordDTO extends BaseKeycloakDTO {
  
  @ApiProperty()
  @IsString()
  newPassword: string;
}
