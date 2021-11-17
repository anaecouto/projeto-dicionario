import { DatabaseHook } from 'src/shared/domain/events/DatabaseHook';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { SolicitationEntity } from '../entities/solicitation.entity';

@EventSubscriber()
export class SolicitationSubscriber
  extends DatabaseHook
  implements EntitySubscriberInterface<SolicitationEntity> {
  constructor(connection: Connection) {
    super();
    connection.subscribers.push(this);
  }

  listenTo() {
    return SolicitationEntity;
  }

  afterInsert(event: InsertEvent<SolicitationEntity>) {
    console.info('[INSERT Solicitation HOOK] - ', event.entity);
    if (event.entity) this.dispatchEventsCallback(event.entity._id);
  }

  afterUpdate(event: UpdateEvent<SolicitationEntity>) {
    console.info('[UPDATE Solicitation HOOK] - ', event.entity);
    if (event.entity) this.dispatchEventsCallback(event.entity._id);
  }

  afterRemove(event: RemoveEvent<SolicitationEntity>) {
    console.info('[AFTER REMOVE Solicitation HOOK] - ', event.entity);
    if (event.entity) this.dispatchEventsCallback(event.entity._id);
  }
}
