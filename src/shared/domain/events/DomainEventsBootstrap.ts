import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEvents } from './DomainEvents';

/**
 * esta classe foi criada para que pudessemos utilizar os eventos do Nest
 */
@Injectable()
export default class DomainsEventBootstrap {
  constructor(eventEmitter: EventEmitter2) {
    DomainEvents.setEmmiter(eventEmitter);
  }
}
