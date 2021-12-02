import { Type } from 'class-transformer';
import { SolicitationOriginEnum } from 'src/shared/core/enums/solicitationOrigin.enum';
import { SolicitationStatusEnum } from 'src/shared/core/enums/solicitationStatus.enum';
import { SolicitationTypeEnum } from 'src/shared/core/enums/solicitationType.enum';
import { IPerson } from 'src/shared/core/interfaces/person.interface';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './_baseEntity';

export class Split {

  @Column()
  accountId: string;
  
  @Column()
  accountKey: string; 
  
  @Column()
  percentage: number;

  @Column()
  calculatedAmount: number;

}

@Entity('solicitations')
export class SolicitationEntity extends BaseEntity {

  @Column()
  person: IPerson;
  
  @Column({ default: SolicitationStatusEnum.CREATED})
  status: SolicitationStatusEnum;
  
  @Column()
  origin: SolicitationOriginEnum;
  
  @Column()
  type: SolicitationTypeEnum;

  @Column({nullable: false})
  serviceKey: string;
  
  @Column({nullable: false})
  subServiceKey: string;
  
  @Column({nullable: false})
  companyKey: string;

  @Column({nullable: false})
  productKey: string;

  @Column({nullable: false})
  amount: number;

  @Column()
  metadata: any;

  @Column()
  externalId: string;

  @Column()
  roomId: string;

  @Column({nullable: true})
  @Type(() => Split)
  split: Split[];

}
