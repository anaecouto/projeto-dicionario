import { DatabaseHook } from 'src/shared/domain/events/DatabaseHook';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { ContractEntity } from '../entities/contract.entity';

@EventSubscriber()
export class ContractSubscriber
  extends DatabaseHook
  implements EntitySubscriberInterface<ContractEntity> {
  constructor(connection: Connection) {
    super();
    connection.subscribers.push(this);
  }

  listenTo() {
    return ContractEntity;
  }

  afterInsert(event: InsertEvent<ContractEntity>) {
    console.info('[INSERT Contract HOOK] - ', event.entity);
    if (event.entity) this.dispatchEventsCallback(event.entity._id);
  }

  afterUpdate(event: UpdateEvent<ContractEntity>) {
    console.info('[UPDATE Contract HOOK] - ', event.entity);
    if (event.entity) this.dispatchEventsCallback(event.entity._id);
  }

  afterRemove(event: RemoveEvent<ContractEntity>) {
    console.info('[AFTER REMOVE Contract HOOK] - ', event.entity);
    if (event.entity) this.dispatchEventsCallback(event.entity._id);
  }
}
