import { ContractStatusEnum } from "src/shared/core/enums/contractStatusEnum";
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

export class ContractDetails {
  @Column()
  installmentAmount: number;

  @Column()
  installmentValue: number;

  @Column()
  totalAmount: number; 

  @Column()
  originAmount: number; 

  @Column()
  monthTax: string;

  @Column()
  totalComission: number; 

  @Column()
  monthlyComission: number; 
}

@Entity("contracts")
export class ContractEntity extends BaseEntity {
  @Column({ nullable: false })
  agency: string;

  @Column({ nullable: false })
  account: string;

  @Column({ unique: true })  
  document: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  sex: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  status: ContractStatusEnum;

  @Column({ nullable: false })
  phones: string[];

  @Column({ nullable: true })
  contactedPhones: string[];

  @Column({ nullable: true })
  options: Option[];

  @Column({ nullable: false })
  metadata: any;
}
