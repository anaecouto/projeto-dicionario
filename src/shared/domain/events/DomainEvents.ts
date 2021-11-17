import DomainEvent from './BaseDomainEvent';
import { AggregateRoot } from '../AggregateRoot';
import { UniqueEntityID } from '../UniqueEntityID';
import { EventEmitter2 } from '@nestjs/event-emitter';

/**
 * @desc Em linhas gerais, esse é o orquestrador de eventos, ele armazenas todas
 * as classes que tem eventos a disparar, e faz o disparo deles quando a hora for
 * certa
 */

export class DomainEvents {
  private static eventEmitter: EventEmitter2;

  private static markedAggregates: AggregateRoot<any>[] = [];
  /**
   * @method markAggregateForDispatch
   * @static
   * @desc Chamado pelo AggregateRoot que tenham criados DomainEvents para serem
   * disparados quando a camada de infraestrutura persistir o dado.
   */

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  /**
   * @method dispatchAggregateEvents
   * @static
   * @desc Dispara todos os evento relacionados a um Aggregate
   */

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: DomainEvent) =>
      this.dispatch(event),
    );
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>,
  ): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  private static findMarkedAggregateByID(
    id: UniqueEntityID,
  ): AggregateRoot<any> {
    let found: AggregateRoot<any> = null as any;

    for (const aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    }

    return found;
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  private static dispatch(event: DomainEvent): void {
    console.info('[Dispatch event] - ', event.eventName);
    this.eventEmitter.emit(event.eventName, event);
  }

  public static setEmmiter(emitter: EventEmitter2) {
    this.eventEmitter = emitter;
  }
}
