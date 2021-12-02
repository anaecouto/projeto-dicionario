import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { WsTokenId } from './wsTokenId';


export interface WsTokenProps {
  token: string;
  companyKey: string;
  tokenDateHour: Date;
  expiresIn?: Date;
}

export class WsToken extends AggregateRoot<WsTokenProps> {
  get tokenId(): WsTokenId {
    return WsTokenId.create(this._id);
  }
  get token(): string {
    return this.props.token;
  }

  get companyKey(): string {
    return this.props.companyKey;
  }

  get tokenDateHour(): Date {
    return this.props.tokenDateHour;
  }

  get expiresIn(): Date | undefined {
    return this.props.expiresIn;
  }

  private constructor(props: WsTokenProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: WsTokenProps, id?: UniqueEntityID): WsToken {
    const token = new WsToken(props, id);

    return token;
  }
}
