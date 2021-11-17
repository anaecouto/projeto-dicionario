import { Entity } from 'src/shared/domain/Entity';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { MessageId } from './MessageId';
import { MessageText } from './MessageText';

export interface MessageProps {
  text: MessageText;
}

export class Message extends Entity<MessageProps> {
  public get text(): MessageText {
    return this.props.text;
  }

  public get messageId(): MessageId {
    return MessageId.create(this._id);
  }

  private constructor(props: MessageProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: MessageProps, id?: UniqueEntityID) {
    return new Message(props, id);
  }
}
