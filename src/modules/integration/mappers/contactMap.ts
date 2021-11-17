import { IContact } from "src/shared/core/interfaces/contact.interface";
import { UniqueEntityID } from "src/shared/domain/UniqueEntityID";
import { ContactEntity } from "src/shared/infra/database/typeorm/entities/contact.entity";
import { DeepPartial } from "typeorm";
import { Contact, ContactProps } from "../domain/contact/Contact";

export class ContactMapper {
    static toDomain(dbContact: ContactEntity): Contact {
      const ContactProps = {
        name: dbContact.name,
        mail: dbContact.mail,
        subject: dbContact.subject,
        message: dbContact.message
      } as ContactProps;
  
      return Contact.create(ContactProps, UniqueEntityID.create(dbContact._id));
    }
  
    static toPersistence(
      contact: Contact
    ): DeepPartial<ContactEntity> {
      return {
        _id: contact.id.toValue(),
        name: contact.name,
        mail: contact.mail,
        subject: contact.subject,
        message: contact.message
      };
    }
  
    static toDto(dbContact: Contact): IContact {
      return {
        name: dbContact.name,
        mail: dbContact.mail,
        subject: dbContact.subject,
        message: dbContact.message
      }
    }
  }
  