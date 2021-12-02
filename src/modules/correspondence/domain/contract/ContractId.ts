import { Entity } from 'src/shared/domain/Entity';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';

export class ContractId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): ContractId {
    return new ContractId(id);
  }
}
