import {
  BeforeInsert,
  Column,
  Entity,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { BaseEntity } from './_baseEntity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;
  
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  documentNumber: string;

  @Column()
  phoneNumber: string;

  @Column()
  roles: string[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
