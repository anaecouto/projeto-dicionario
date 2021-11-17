import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsObject, IsOptional, IsString } from "class-validator";
import { AccountTypeEnum } from "src/shared/core/enums/accountType.enum";
import { ISplitSettings } from "src/shared/core/interfaces/splitSettings.interface";
export class AccountSettingsDTO {

  @ApiProperty({required: true})
  @IsString()
  type: AccountTypeEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiHideProperty()
  accountKey?: string;
  
  @ApiProperty()
  @IsObject()
  @IsOptional()
  @ApiHideProperty()
  split?: ISplitSettings[];

}
