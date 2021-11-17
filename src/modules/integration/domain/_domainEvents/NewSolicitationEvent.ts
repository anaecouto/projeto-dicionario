import BaseDomainEvent from "src/shared/domain/events/BaseDomainEvent";
import { UniqueEntityID } from "src/shared/domain/UniqueEntityID";
import { Solicitation } from "../solicitation/Solicitation";

export class NewSolicitationEvent extends BaseDomainEvent {
  constructor(public solicitation: Solicitation) {
    super('solicitation.newSolicitation', undefined);
  }

  getAggregateId(): UniqueEntityID {
    return this.solicitation.id;
  }
}
