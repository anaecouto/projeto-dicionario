import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { AccountTypeEnum } from "src/shared/core/enums/accountType.enum";
import { IAccountSettings } from "src/shared/core/interfaces/accountSettings.interface";
import { AccountSettingsDTO } from "./accountSettingsDTO";
import { BaseKeycloakDTO } from "./baseKeycloakDTO";
import { UserDTO } from "./userDTO";

export class CreateNewAccountDTO extends BaseKeycloakDTO {
  
  @ApiProperty()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO;

  @ApiProperty()
  @IsDefined()
  @IsNotEmptyObject()
  @ApiHideProperty()
  @Type(() => AccountSettingsDTO)
  settings: AccountSettingsDTO;
}
