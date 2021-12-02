import { ValueObject } from 'src/shared/domain/ValueObject';
import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';

export interface AlternativeProps {
  fullPrice?: string;
  times?: string;
  individual?: string;
  monthTax?: string;
  description?: string;
}

export class Alternative extends ValueObject<AlternativeProps> {
  get fullPrice(): string {
    return this.props.fullPrice || '';
  }

  get times(): string {
    return this.props.times || '';
  }

  get individual(): string {
    return this.props.individual || '';
  }

  get monthTax(): string {
    return this.props.monthTax || '';
  }

  get description(): string {
    return this.props.description || '';
  }

  private constructor(props: AlternativeProps) {
    super(props);
  }

  static create(props: AlternativeProps | undefined): Alternative | undefined {
    if(props) {
      const person = new Alternative(props);
      return person;
    }
    return undefined;
  }
}
