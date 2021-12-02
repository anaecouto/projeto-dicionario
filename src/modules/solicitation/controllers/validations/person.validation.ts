import { ApiProperty } from "@nestjs/swagger";
import { IPerson } from "src/shared/core/interfaces/person.interface";
import { AddressValidation } from "./address.validation";

export class PersonValidation implements IPerson {
  @ApiProperty()
  name: string;
  @ApiProperty()
  documentNumber: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  birthDate: string;
  @ApiProperty()
  address: AddressValidation;
  @ApiProperty()
  email: string;
}
