import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/shared/infra/database/typeorm/entities/message.entity';
import { Repository } from 'typeorm';
import { Message } from '../../domain/message/Message';
import { MessageMapper } from '../../mappers/MessageMap';
import { IMessagesRepo } from '../IMessagesRepo';

@Injectable()
export class MessagesRepoTypeOrm implements IMessagesRepo {
  constructor(
    @InjectRepository(MessageEntity)
    private messageTypeOrmRepo: Repository<MessageEntity>,
  ) {}

  async getAllMessagesBySenderName(name: string): Promise<Message[]> {
    const foundMessages = await this.messageTypeOrmRepo.find({
      where: {
        user: {
          name: name,
        },
      },
    });

    return foundMessages.map(MessageMapper.toDomain);
  }
}
