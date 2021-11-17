import { UniqueEntityID } from "src/shared/domain/UniqueEntityID";
import { Entity } from '../../../../shared/domain/Entity';

export class ContactId extends Entity<any> {
    get id(): UniqueEntityID {
      return this._id;
    }
  
    private constructor(id?: UniqueEntityID) {
      super(null, id);
    }
  
    public static create(id?: UniqueEntityID): ContactId {
      return new ContactId(id);
    }
  }