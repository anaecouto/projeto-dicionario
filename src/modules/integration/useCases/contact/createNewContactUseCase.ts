import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/core/IUseCase";
import { Contact } from "../../domain/contact/Contact";
import { ContactMapper } from "../../mappers/contactMap";
import { IContactRepo } from "../../repositories/contactRepo.interface";
import { ContactRepoTypeOrm } from "../../repositories/implementations/contactRepoTypeOrm";
import { IContactRequestDTO, IContactResponseDTO } from "./dto/contactDTO";

@Injectable()
export class CreateNewContactUseCase
  implements
    IUseCase<IContactRequestDTO, IContactResponseDTO> {
  constructor(@Inject(ContactRepoTypeOrm) private contactRepo: IContactRepo) {}

  async execute(
    request: IContactRequestDTO,
  ): Promise<IContactResponseDTO> {
    console.log('USE CASE!!!!!!');
    
    const contact = Contact.create(request);
    console.log('contact: ', contact);
    return ContactMapper.toDto(await this.contactRepo.save(contact));
  }
}