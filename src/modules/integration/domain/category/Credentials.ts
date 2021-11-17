import { ValueObject } from 'src/shared/domain/ValueObject';

export interface CredentialsProps {
  token?: string;
  username?: string;
  password?: string;
}

export class Credentials extends ValueObject<CredentialsProps> {
  get token(): string {
    return this.props.token || '';
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

  static create(props: CredentialsProps): Credentials {
    const credentials = new Credentials(props);
    return credentials;
  }
}
