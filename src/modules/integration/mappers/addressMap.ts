import { IAddress } from "src/shared/core/interfaces/address.interface";
import { Address } from "../domain/solicitation/Address";

export class AddressMapper {
  static toDto(solicitation: Address | undefined): IAddress | undefined{
    if(solicitation) {
      return {
        country: solicitation?.country,
        state: solicitation?.state,
        city: solicitation?.city,
        neighborhood: solicitation?.neighborhood,
        street: solicitation?.street,
        streetNumber: solicitation?.streetNumber,
        zipCode: solicitation?.zipCode,
        complement: solicitation?.complement,
      };
    }
    return undefined;
  }
}
