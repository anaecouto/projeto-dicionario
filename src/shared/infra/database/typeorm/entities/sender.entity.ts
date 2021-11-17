import { Column, Entity, OneToMany } from 'typeorm';
import { MessageEntity } from './message.entity';
import { BaseEntity } from './_baseEntity';

@Entity('senders')
export class SenderEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => MessageEntity, (message) => message.user, {
    cascade: true,
  })
  messages: MessageEntity[];
}
