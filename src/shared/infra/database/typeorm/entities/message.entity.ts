import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SenderEntity } from './sender.entity';
import { BaseEntity } from './_baseEntity';

@Entity('messages')
export class MessageEntity extends BaseEntity {
  @Column()
  messageText: string;

  @ManyToOne(() => SenderEntity, (sender) => sender.messages)
  @JoinColumn()
  user: SenderEntity;
}
