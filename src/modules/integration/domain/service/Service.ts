import { AggregateRoot } from 'src/shared/domain/AggregateRoot';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { ServiceId } from './ServiceId';
import { SubService } from './SubService';

export interface ServiceProps {
  title: string,
  serviceKey: string,
  icon: string, 
  sequence: number,
  description: string,
  subServices: SubService[]
}

export class Service extends AggregateRoot<ServiceProps>  {
  get serviceId(): ServiceId {
    return ServiceId.create(this._id);
  }

  get title(): string {
    return this.props.title;
  }

  get serviceKey(): string {
    return this.props.serviceKey;
  }

  get icon(): string {
    return this.props.icon;
  }

  get sequence(): number {
    return this.props.sequence;
  }

  get description(): string {
    return this.props.description;
  }

  get subServices(): SubService[] {
    return this.props.subServices;
  }

  private constructor(props: ServiceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: ServiceProps, id?: UniqueEntityID): Service {
    const service = new Service(props, id);

    return service;
  }
}
