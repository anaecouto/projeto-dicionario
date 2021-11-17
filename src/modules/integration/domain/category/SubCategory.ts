import { ValueObject } from 'src/shared/domain/ValueObject';
import { Credentials } from './Credentials';

export interface SubCategoryProps {
  title: string,
  key: string,
  sequence: number,
  siteUrl: string,
  baseUrl: string,
  credentials: Credentials,
}

export class SubCategory extends ValueObject<SubCategoryProps>  {
  get title(): string {
    return this.props.title;
  }

  get key(): string {
    return this.props.key;
  }

  get sequence(): number {
    return this.props.sequence;
  }

  get siteUrl(): string {
    return this.props.siteUrl;
  }

  get baseUrl(): string {
    return this.props.baseUrl;
  }

  get credentials(): Credentials {
    return this.props.credentials;
  }

  private constructor(props: SubCategoryProps) {
    super(props);
  }

  static create(props: SubCategoryProps): SubCategory {
    const subCategory = new SubCategory(props);
    return subCategory;
  }
}
