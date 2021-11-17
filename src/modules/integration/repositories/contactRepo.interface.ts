import { Contact } from "../domain/contact/Contact";

export interface IContactRepo {
    save(Contact: Contact): Promise<Contact>;
    findAll(): Promise<Contact[]>;
    findById(id: string): Promise<Contact>;
  }