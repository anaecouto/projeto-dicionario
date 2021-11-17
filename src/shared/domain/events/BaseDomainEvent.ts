import { UniqueEntityID } from '../UniqueEntityID';

export interface Event {
  eventName: string;
  data: any;
  dateTimeOccurred: Date;
}

/**
 * @desc A base para que qualquer evento de domínio ocorra
 */

export default abstract class BaseDomainEvent {
  constructor(public eventName: string, public dateTimeOccurred?: Date) {
    this.dateTimeOccurred = dateTimeOccurred || new Date();
  }

  abstract getAggregateId(): UniqueEntityID;
}
