import { SolicitationOriginEnum } from 'src/shared/core/enums/solicitationOrigin.enum';
import { SolicitationStatusEnum } from 'src/shared/core/enums/solicitationStatus.enum';
import { SolicitationTypeEnum } from 'src/shared/core/enums/solicitationType.enum';
import { IContract } from 'src/shared/core/interfaces/contract.interface';
import { ISolicitationSplit } from 'src/shared/core/interfaces/solicitationSplit.interface';
import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { SendMailAfterSolicitationEvent } from '../_domainEvents/SendMailAfterSoliciitationEvent';
import { Person } from './Person';
import { SolicitationId } from './SolicitationId';


export interface SolicitationProps {
  person?: Person;
  status?: SolicitationStatusEnum;
  contract?: IContract;
  origin?: SolicitationOriginEnum;
  type?: SolicitationTypeEnum;
  serviceKey: string;
  subServiceKey: string;
  companyKey: string;
  productKey: string;
  amount: any;
  metadata?: any;
  externalId?: string;
  roomId?: string;
  split?: ISolicitationSplit[];
}

export class Solicitation extends AggregateRoot<SolicitationProps> {
  get solicitationId(): SolicitationId {
    return SolicitationId.create(this._id);
  }

  get person(): Person | undefined {
    return this.props.person;
  }

  get status(): SolicitationStatusEnum | undefined {
    return this.props.status;
  }

  public setStatus(solicitaionStatusEnum: SolicitationStatusEnum) {
    this.props.status = solicitaionStatusEnum;
    this.addDomainEvent(new SendMailAfterSolicitationEvent(this));
  }

  get contract(): IContract | undefined {
    return this.props.contract;
  }

  get origin(): SolicitationOriginEnum | undefined {
    return this.props.origin;
  }

  get type(): SolicitationTypeEnum | undefined {
    return this.props.type;
  }

  get serviceKey(): string {
    return this.props.serviceKey;
  }

  get subServiceKey(): string {
    return this.props.subServiceKey;
  }

  get companyKey(): string {
    return this.props.companyKey;
  }

  get amount(): number {
    return this.props.amount;
  }

  set amount(amount: number) {
    this.props.amount = 100;
  }

  public get externalId(): string | undefined {
    return this.props.externalId;
  }

  public set externalId(externalId: string | undefined) {
    this.props.externalId = externalId;
  }

  public setExternalId(externalId: string | undefined) {
    this.props.externalId = externalId;
  }

  get metadata(): any | undefined {
    return this.props.metadata;
  }

  set metadata(metadata: any) {
    this.props.metadata = metadata;
  }

  get roomId(): string {
    return this.props.roomId || '';
  }

  set roomId(roomId: string | '') {
    this.props.roomId = roomId;
  }

  get split(): ISolicitationSplit[] | undefined {
    return this.props.split;
  }

  set split(split: ISolicitationSplit[] | undefined) {
    this.props.split = split;
  }

  get productKey(): string {
    return this.props.productKey;
  }

  private constructor(props: SolicitationProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: SolicitationProps, id?: UniqueEntityID): Solicitation {
    const solicitation = new Solicitation(props, id);

    const isNew = !id;
    if (isNew) {
      solicitation.setStatus(SolicitationStatusEnum.CREATED);
      // solicitation.addDomainEvent(new NewSolicitationEvent(solicitation));
    }
    return solicitation;
  }
}
