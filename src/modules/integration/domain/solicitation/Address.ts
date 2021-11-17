import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';

export interface AddressProps {
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  streetNumber: string;
  zipCode: string;
  complement: string;
}

export class Address extends AggregateRoot<AddressProps> {
  get country(): string {
    return this.props.country;
  }

  get state(): string {
    return this.props.state;
  }

  get city(): string {
    return this.props.city;
  }

  get neighborhood(): string {
    return this.props.neighborhood;
  }

  get street(): string {
    return this.props.street;
  }

  get streetNumber(): string {
    return this.props.streetNumber;
  }

  get zipCode(): string {
    //validdador de cep
    return this.props.zipCode;
  }

  get complement(): string {
    return this.props.complement;
  }

  private constructor(props: AddressProps) {
    super(props);
  }

  static create(props: AddressProps | undefined): Address | undefined {
    if(props) {
      const person = new Address(props);
      return person;
    }
    return undefined;
  }
}
