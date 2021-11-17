import BaseDomainEvent from 'src/shared/domain/events/BaseDomainEvent';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { Sender } from '../sender/Sender';

export class NewSenderEvent extends BaseDomainEvent {
  constructor(public sender: Sender) {
    super('sender.newSender', undefined);
  }

  getAggregateId(): UniqueEntityID {
    return this.sender.id;
  }
}
