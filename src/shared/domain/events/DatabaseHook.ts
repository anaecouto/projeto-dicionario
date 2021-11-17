import { ObjectId } from 'bson';
import { UniqueEntityID } from '../UniqueEntityID';
import { DomainEvents } from './DomainEvents';

/**
 * @desc A base para que os listeners de banco de dados possam disparar o eventos
 * quando for a hora certa.
 */

export abstract class DatabaseHook {
  protected dispatchEventsCallback(id: string | ObjectId) {
    const aggregateId = UniqueEntityID.create(id);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
  }
}
