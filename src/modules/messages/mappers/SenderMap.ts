import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { MessageEntity } from 'src/shared/infra/database/typeorm/entities/message.entity';
import { SenderEntity } from 'src/shared/infra/database/typeorm/entities/sender.entity';
import { DeepPartial } from 'typeorm';
import { Message } from '../domain/message/Message';
import { Messages } from '../domain/message/Messages';
import { MessageText } from '../domain/message/MessageText';
import { Sender } from '../domain/sender/Sender';
import { SenderName } from '../domain/sender/SenderName';
import { MessageMapper } from './MessageMap';

export class SenderMapper {
  static toDomain(dbSender: SenderEntity): Sender {
    const messages = dbSender.messages.map(MessageMapper.toDomain);

    return Sender.create(
      {
        messages: Messages.create(messages),
        name: SenderName.create({
          value: dbSender.name,
        }),
      },
      UniqueEntityID.create(dbSender._id),
    );
  }

  static toPersistence(sender: Sender): DeepPartial<SenderEntity> {
    return {
      _id: sender.senderId.id.toValue(),
      name: sender.name.value,
      messages: sender.props.messages.currentItems.map(
        MessageMapper.toPersistence,
      ),
    };
  }
}
