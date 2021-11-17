import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { MessageEntity } from 'src/shared/infra/database/typeorm/entities/message.entity';
import { DeepPartial } from 'typeorm';
import { Message } from '../domain/message/Message';
import { MessageText } from '../domain/message/MessageText';

export class MessageMapper {
  static toDomain(dbMessage: MessageEntity): Message {
    const text = MessageText.create({ value: dbMessage.messageText });

    return Message.create(
      {
        text,
      },
      UniqueEntityID.create(dbMessage._id),
    );
  }

  static toPersistence(message: Message): DeepPartial<MessageEntity> {
    return {
      _id: message.messageId.id.toValue(),
      messageText: message.text.value,
    };
  }
}
