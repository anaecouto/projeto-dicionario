import { ContractStatusEnum } from 'src/shared/core/enums/contractStatusEnum';
import { AggregateRoot } from 'src/shared/domain/AggregateRoot';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { PushSingleContractOnQueueEvent } from '../_domainEvents/PushContractOnQueueEvent';

import { ContractId } from './ContractId';
import { Option } from './Option';

export interface ContractProps {
  name: string;
  sex?: string;
  state: string;
  agency: string;
  account: string;
  document: string;
  birthDate?: Date;
  status: ContractStatusEnum;
  phones: string[];
  options?: Option[];
}

export class Contract extends AggregateRoot<ContractProps> {
  get contractId(): ContractId {
    return ContractId.create(this._id);
  }


  get agency(): string{ 
    return this.props.agency;
  }

  get account(): string{ 
    return this.props.account;
  }

  get document(): string{ 
    return this.props.document;
  }

  get name(): string{ 
    return this.props.name;
  }

  get state(): string{ 
    return this.props.state;
  }

  get sex(): string{ 
    return this.props.sex || '';
  }

  get birthDate(): Date | undefined { 
    return this.props.birthDate;
  }

  get status(): ContractStatusEnum {
    return this.props.status;
  }
  set status(status: ContractStatusEnum) { 
    this.props.status = status;
  }

  get phones(): string[]{ 
    return this.props.phones;
  }

  get options(): Option[] | undefined { 
    return this.props.options;
  }

  private constructor(props: ContractProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: ContractProps, id?: UniqueEntityID, emitQueueEvent?: boolean) {
    const contract = new Contract(props, id);
    const isNew = !id;
    if (isNew && emitQueueEvent) {
      contract.addDomainEvent(new PushSingleContractOnQueueEvent(contract));
    }
    return contract;
  }
}
