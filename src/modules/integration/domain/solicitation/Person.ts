import { throws } from 'assert';
import { ValueObject } from 'src/shared/domain/ValueObject';
import { Address } from './Address';


export interface PersonProps {
  name?: string;
  documentNumber?: string;
  phoneNumber?: string;
  birthDate?: string;
  address?: Address;
  email?: string;
  ip?: string;
  userAgent?: string;
}

export class Person extends ValueObject<PersonProps> {
  get name(): string {
    return this.props.name || '';
  }

  get documentNumber(): string {
    return this.props.documentNumber || '';
  }

  get phoneNumber(): string {
    return this.props.phoneNumber || '';
  }

  get birthDate(): string {
    return this.props.birthDate || '';
  }

  get email(): string {
    return this.props.email || '';
  }

  get address(): Address | undefined{
    return this.props.address;
  }

  get ip(): string {
    return this.props.ip || '';
  }

  get userAgent(): string {
    return this.props.userAgent || '';
  }
  
  private constructor(props: PersonProps) {
    super(props);
  }

  static create(props: PersonProps): Person {
    const person = new Person(props);
    return person;
  }
}
