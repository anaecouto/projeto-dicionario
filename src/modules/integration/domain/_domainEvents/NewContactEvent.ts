import BaseDomainEvent from "src/shared/domain/events/BaseDomainEvent";
import { UniqueEntityID } from "src/shared/domain/UniqueEntityID";
import { Contact } from "../contact/Contact";

export class NewContactEvent extends BaseDomainEvent {
  constructor(public contact: Contact) {
    super('contact.newContact', undefined);
  }

  getAggregateId(): UniqueEntityID {
    return this.contact.id;
  }
}
