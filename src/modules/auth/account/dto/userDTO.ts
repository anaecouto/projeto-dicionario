import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsISO8601, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { IAddress } from "src/shared/core/interfaces/address.interface";
export class UserDTO {

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(10, {
    message: 'O número do documento deve conter pelo menos 8 caracteres.',
  })
  documentNumber: string;

  @IsPhoneNumber("BR", { message: "O campo phoneNumber precisa ser um telefone válido." })
  phoneNumber: string;

  @ApiProperty()
  @IsISO8601()
  birthDate: Date;
  
  @ApiHideProperty()
  @IsOptional()
  attributes: {};

  @ApiProperty()
  @IsOptional()
  address: IAddress;
  
  @ApiHideProperty()
  @IsOptional()
  emailVerified: boolean;
  
  @ApiHideProperty()
  @IsOptional()
  requiredActions: string[];
  
  @ApiHideProperty()
  @IsOptional()
  clientRoles: {};

}
