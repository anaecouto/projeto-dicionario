import { AggregateRoot } from "src/shared/domain/AggregateRoot";
import { UniqueEntityID } from "src/shared/domain/UniqueEntityID";
import { NewContactEvent } from "../_domainEvents/NewContactEvent";
import { ContactId } from "./ContactId";

export interface ContactProps{
    name: string;
    mail: string;
    subject: string;
    message: string;
}

export class Contact extends AggregateRoot<ContactProps>  {
    get contactId(): ContactId {
      return ContactId.create(this._id);
    }
  
    get name(): string {
      return this.props.name;
    }
  
    get mail(): string {
      return this.props.mail;
    }
  
    get subject(): string {
      return this.props.subject;
    }
  
    get message(): string {
      return this.props.message;
    }
  
    private constructor(props: ContactProps, id?: UniqueEntityID) {
      super(props, id);
    }
  
    static create(props: ContactProps, id?: UniqueEntityID): Contact {
      const contact = new Contact(props, id);
  
      const isNew = !id;
      if (isNew) {
        contact.addDomainEvent(new NewContactEvent(contact));
      }
      return contact;
    }
}