import BaseDomainEvent from "../../../../shared/domain/events/BaseDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Contract } from '../../domain/contract/Contract';
export class PushSingleContractOnQueueEvent extends BaseDomainEvent {
  constructor(public contract: Contract) {
    super('push.single.contract.on.queue', undefined);
  }

  getAggregateId(): UniqueEntityID {
    return this.contract.id;
  }
}
