import BaseDomainEvent from "src/shared/domain/events/BaseDomainEvent";
import { UniqueEntityID } from "src/shared/domain/UniqueEntityID";
import { Solicitation } from "../solicitation/Solicitation";

export class SendMailAfterSolicitationEvent extends BaseDomainEvent {
  constructor(public solicitation: Solicitation) {
    super('send.mail.after.solicitation', undefined);
  }

  getAggregateId(): UniqueEntityID {
    return this.solicitation.id;
  }
}
