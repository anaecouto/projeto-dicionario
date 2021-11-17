import { Entity } from './Entity';
import { DomainEvents } from './events/DomainEvents';
import DomainEvent from './events/BaseDomainEvent';
import { UniqueEntityID } from './UniqueEntityID';

/**
 * @desc AggregateRoots são entidades que normalmente carregam outras entidades,
 * são responsáveis por regras de negócios mais complexas e também tem a responsabilidade
 * de enviar eventos de domínio
 */

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = [];

  get id(): UniqueEntityID {
    return this._id;
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    // Adicionar um domain event para essa lista de eventos
    this._domainEvents.push(domainEvent);
    // Avisa ao "orquestrados de eventos" que essa classe tem eventos a disparar
    DomainEvents.markAggregateForDispatch(this);

    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: DomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[EVENTO DE DOMÍNIO CRIADO]:`,
      thisClass?.constructor.name,
      '==>',
      domainEventClass?.constructor.name,
    );
  }
}
