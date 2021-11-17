import { ValueObject } from 'src/shared/domain/ValueObject';

export interface SubServiceProps {
  title: string,
  subServiceKey: string,
  sequence?: number,
  description?: string,
  companies: any[],
}

export class SubService extends ValueObject<SubServiceProps>  {
  get title(): string {
    return this.props.title;
  }

  get subServiceKey(): string {
    return this.props.subServiceKey;
  }

  get sequence(): number | undefined{
    return this.props.sequence;
  }

  get description(): string | undefined{
    return this.props.description;
  }

  get companies(): any[] {
    return this.props.companies;
  }


  private constructor(props: SubServiceProps) {
    super(props);
  }

  static create(props: SubServiceProps): SubService {
    const subService = new SubService(props);
    return subService;
  }
}
