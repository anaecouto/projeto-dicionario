import BaseDomainEvent from "../../../../shared/domain/events/BaseDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Contract } from '../../domain/contract/Contract';
export class PushContractOnQueueEvent extends BaseDomainEvent {
  constructor(public contract: Contract) {
    super('push.contract.on.queue', undefined);
  }

  getAggregateId(): UniqueEntityID {
    return this.contract.id;
  }
}
