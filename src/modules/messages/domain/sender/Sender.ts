import { AggregateRoot } from 'src/shared/domain/AggregateRoot';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { Message } from '../message/Message';
import { Messages } from '../message/Messages';
import { NewSenderEvent } from '../_domainEvents/NewSenderEvent';
import { SenderId } from './SenderId';
import { SenderName } from './SenderName';

export interface SenderProps {
  name: SenderName;
  messages: Messages;
}

export class Sender extends AggregateRoot<SenderProps> {
  get senderId(): SenderId {
    return SenderId.create(this._id);
  }

  get name(): SenderName {
    return this.props.name;
  }
  get currentMessages(): Message[] {
    return this.props.messages.currentItems;
  }

  get deletedMessages(): Message[] {
    return this.props.messages.getRemovedItems();
  }

  get newMessages(): Message[] {
    return this.props.messages.getNewItems();
  }

  private constructor(props: SenderProps, id?: UniqueEntityID) {
    super(props, id);
  }

  addNewMessage(message: Message) {
    this.props.messages.add(message);
  }

  static create(props: SenderProps, id?: UniqueEntityID): Sender {
    const sender = new Sender(props, id);

    const isNew = !id;
    if (isNew) {
      sender.addDomainEvent(new NewSenderEvent(sender));
    }

    return sender;
  }
}
