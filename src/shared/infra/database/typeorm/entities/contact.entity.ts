import { Column, Entity } from "typeorm";
import { BaseEntity } from './_baseEntity';

@Entity('contacts')
export class ContactEntity extends BaseEntity {

  @Column()
  name?: string;
  
  @Column()
  mail?: string;

  @Column()
  subject?: string;
  
  @Column()
  message?: string;
  
}