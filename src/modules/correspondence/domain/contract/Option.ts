import { ValueObject } from 'src/shared/domain/ValueObject';
import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { Alternative } from './Alternative';

export interface OptionProps {
  title: string;
  alternatives: Alternative[];
}

export class Option extends ValueObject<OptionProps> {
  get title(): string {
    return this.props.title;
  }

  get alternatives(): Alternative[] {
    return this.props.alternatives;
  }
  
  private constructor(props: OptionProps) {
    super(props);
  }

  static create(props: OptionProps | undefined): Option | undefined {
    if(props) {
      const person = new Option(props);
      return person;
    }
    return undefined;
  }
}
