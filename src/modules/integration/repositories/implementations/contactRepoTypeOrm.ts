import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContactEntity } from "src/shared/infra/database/typeorm/entities/contact.entity";
import { Repository } from "typeorm";
import { Contact } from "../../domain/contact/Contact";
import { ContactMapper } from "../../mappers/contactMap";
import { IContactRepo } from "../contactRepo.interface";

@Injectable()
export class ContactRepoTypeOrm implements IContactRepo {
  constructor(
    @InjectRepository(ContactEntity)
    private ContactTypeOrmRepo: Repository<ContactEntity>,
  ) {}

  async save(Contact: Contact): Promise<Contact> {
    const ContactDb = ContactMapper.toPersistence(Contact);
    const ContactEntity = await this.ContactTypeOrmRepo.save(ContactDb);
    console.log('salvou Contato: ', ContactEntity);
    return ContactMapper.toDomain(ContactEntity);
  }

  async findAll(): Promise<Contact[]> {
    const found = await this.ContactTypeOrmRepo.find();

    return found.map((item) => {
      return ContactMapper.toDomain(item);
    });
  }

  findById(id: string): Promise<Contact> {
    throw new Error("Method not implemented.");
  }

  // async findById(id: string): Promise<Contact> {
  //   const ContactEntity = await this.ContactTypeOrmRepo.findOne(id);
  //   if(ContactEntity) 
  //     return ContactMapper.toDomain(ContactEntity);
  //   return ContactMapper.toDomain(new ContactEntity());
  // }
}
