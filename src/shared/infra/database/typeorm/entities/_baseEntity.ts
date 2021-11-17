import { ObjectId, ObjectID } from 'bson';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

export abstract class BaseEntity {
  
  @ObjectIdColumn()
  _id: ObjectID;
  
  @Column({default: true})
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
