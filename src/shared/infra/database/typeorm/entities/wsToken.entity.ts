import { Column, Entity } from 'typeorm';
import { BaseEntity } from './_baseEntity';

@Entity('wstokens')
export class WsTokensEntity extends BaseEntity {
  @Column()
  token: string;

  @Column()
  companyKey: string;

  @Column()
  tokenDateHour: Date;

  @Column()
  expiresIn: Date;
}