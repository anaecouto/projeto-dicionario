import { ValueObject } from 'src/shared/domain/ValueObject';

export interface CredentialsProps {
  baseUrl: string;
  token?: string;
  username?: string;
  password?: string;
}

export class Credentials extends ValueObject<CredentialsProps> {
  get token(): string {
    return this.props.token || '';
  }

  get baseUrl(): string {
    return this.props.baseUrl;
  }

  get username(): string {
    return this.props.username || '';
  }

  get password(): string {
    return this.props.password || '';
  }

  private constructor(props: CredentialsProps) {
    super(props);
  }

  static create(props: CredentialsProps | undefined): Credentials |undefined {
    if(props) {
      const credentials = new Credentials(props);
      return credentials;
    }
    return undefined;
  }
}
