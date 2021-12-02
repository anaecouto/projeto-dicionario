import { Column, Entity } from "typeorm";
import { BaseEntity } from "./_baseEntity";

export class Alternative {
  @Column()
  fullPrice: string;
  
  @Column()
  times: string;
  
  @Column()
  individual: string;
  
  @Column()
  monthTax: string;
  
  @Column()
  description: string;
}

export class Option {
  @Column()
  title: string;

  @Column()
  alternatives: Alternative[];
}

@Entity("contracts")
export class ContractEntity extends BaseEntity {
  @Column()
  agency: string;

  @Column()
  account: string;

  @Column()
  document: string;

  @Column()
  name: string;

  @Column()
  state: string;

  @Column()
  sex: string;

  @Column()
  birthDate: Date;

  @Column()
  status: string;

  @Column()
  phones: string[];

  @Column()
  options: Option[];
}
