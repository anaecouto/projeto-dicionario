import { AggregateRoot } from "src/shared/domain/AggregateRoot";
import { Credentials } from "./Credentials";
import { CompanyId } from "./CompanyId";
import { UniqueEntityID } from "src/shared/domain/UniqueEntityID";


export interface CompanyProps {
  name: string;
  key: string;
  siteUrl?: string;
  credentials?: Credentials;
  metadata?: any;
}

export class Company extends AggregateRoot<CompanyProps>  {
  get CompanyId(): CompanyId {
    return CompanyId.create(this._id);
  }

  get name(): string {
    return this.props.name;
  }

  get key(): string {
    return this.props.key;
  }

  get siteUrl(): string {
    return this.props.siteUrl || '';
  }

  get credentials(): Credentials | undefined{
    return this.props?.credentials;
  }

  get metadata(): any | undefined {
    return this.props.metadata;
  }
  
  private constructor(props: CompanyProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: CompanyProps, id?: UniqueEntityID): Company {
    const company = new Company(props, id);

    return company;
  }
}
