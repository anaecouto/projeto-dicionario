import { DatabaseHook } from 'src/shared/domain/events/DatabaseHook';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { ContactEntity } from '../entities/contact.entity';

@EventSubscriber()
export class ContactSubscriber
  extends DatabaseHook
  implements EntitySubscriberInterface<ContactEntity> {
  constructor(connection: Connection) {
    super();
    connection.subscribers.push(this);
  }

  listenTo() {
    return ContactEntity;
  }

  afterInsert(event: InsertEvent<ContactEntity>) {
    console.info('[INSERT Contact HOOK] - ', event.entity);
    if (event.entity) this.dispatchEventsCallback(event.entity._id);
  }

  afterUpdate(event: UpdateEvent<ContactEntity>) {
    console.info('[UPDATE Contact HOOK] - ', event.entity);
    if (event.entity) this.dispatchEventsCallback(event.entity._id);
  }

  afterRemove(event: RemoveEvent<ContactEntity>) {
    console.info('[AFTER REMOVE Contact HOOK] - ', event.entity);
    if (event.entity) this.dispatchEventsCallback(event.entity._id);
  }
}
