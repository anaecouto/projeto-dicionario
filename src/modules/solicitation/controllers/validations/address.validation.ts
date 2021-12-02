import { ApiProperty } from "@nestjs/swagger";
import { IAddress } from "src/shared/core/interfaces/address.interface";

export class AddressValidation
  implements IAddress {

    @ApiProperty()
    country: string;
    @ApiProperty()
    state: string;
    @ApiProperty()
    city: string;
    @ApiProperty()
    neighborhood: string;
    @ApiProperty()
    street: string;
    @ApiProperty()
    streetNumber: string;
    @ApiProperty()
    zipCode: string;
    @ApiProperty()
    complement: string;
}




