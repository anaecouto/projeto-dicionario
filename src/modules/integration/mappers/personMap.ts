import { IPerson } from "src/shared/core/interfaces/person.interface";
import { Person } from "../domain/solicitation/Person";
import { AddressMapper } from "./addressMap";

export class PersonMapper {

  static toDto(solicitation?: Person): IPerson | undefined {
    
    if(solicitation) {
      console.log('TO DTO PERSON!!!!')
      const addressInterface = AddressMapper.toDto(solicitation?.address); 
      console.log('addressInteface: ', addressInterface);
      return {
        name: solicitation.name,
        documentNumber: solicitation.documentNumber,
        phoneNumber: solicitation.phoneNumber,
        birthDate: solicitation.birthDate,
        address: addressInterface,
        email: solicitation.email,
        ip: solicitation.ip,
        userAgent: solicitation.userAgent,
      };
    }
      return undefined;
  } 
}
