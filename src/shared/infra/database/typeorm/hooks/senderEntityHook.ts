import { DatabaseHook } from 'src/shared/domain/events/DatabaseHook';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { SenderEntity } from '../entities/sender.entity';

@EventSubscriber()
export class SenderSubscriber
  extends DatabaseHook
  implements EntitySubscriberInterface<SenderEntity> {
  constructor(connection: Connection) {
    super();
    connection.subscribers.push(this);
  }

  listenTo() {
    return SenderEntity;
  }

  afterInsert(event: InsertEvent<SenderEntity>) {
    console.info('[INSERT SENDER HOOK] - ', event.entity);
    if (event.entity) this.dispatchEventsCallback(event.entity._id);
  }

  afterUpdate(event: UpdateEvent<SenderEntity>) {
    console.info('[UPDATE SENDER HOOK] - ', event.entity);
    if (event.entity) this.dispatchEventsCallback(event.entity._id);
  }

  afterRemove(event: RemoveEvent<SenderEntity>) {
    console.info('[AFTER REMOVE SENDER HOOK] - ', event.entity);
    if (event.entity) this.dispatchEventsCallback(event.entity._id);
  }
}
