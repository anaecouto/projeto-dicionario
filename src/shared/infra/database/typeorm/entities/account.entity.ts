import {
  BeforeInsert,
  Column,
  Entity,
} from 'typeorm';
import { BaseEntity } from './_baseEntity';
import { AccountTypeEnum } from 'src/shared/core/enums/accountType.enum';
import { IBalance } from 'src/shared/core/interfaces/balance.interface';
import { ICashback } from 'src/shared/core/interfaces/cashback.interface';
import { IAddress } from 'src/shared/core/interfaces/address.interface';
import { IAccountSettings } from 'src/shared/core/interfaces/accountSettings.interface';
import { ISplitSettings } from 'src/shared/core/interfaces/splitSettings.interface';


export class Person {
  @Column()
  name: string;

  @Column({ unique: true })  
  email: string;

  @Column({ unique: true })
  documentNumber: string;
  
  @Column()
  phoneNumber: string;
  
  @Column({nullable: true})
  birthDate: Date;
  
  @Column()
  address?: IAddress;

  @Column({ unique: true})
  userId?: string;

}

export class Settings {

  @Column({ nullable: false })
  type: AccountTypeEnum;
  
  @Column()
  accountKey: string; 
  
  @Column()
  split: ISplitSettings;

}

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  
  @Column(type => Person)
  owner: Person; 

  @Column({ nullable: false })
  realm: string;

  @Column()
  balance : IBalance;

  @Column()
  cashbacks: ICashback[];

  @Column({nullable: true})
  settings: IAccountSettings;

  @BeforeInsert()
  async buildBalance() {
    const build = {
      accountBalance: 0,
      cashbackBalance: 0
    } as IBalance;
    this.balance = build;
    this.active = true;
  }
}
