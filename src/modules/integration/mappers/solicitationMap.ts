import { ISolicitation } from "src/shared/core/interfaces/solicitation.interface";
import { UniqueEntityID } from "src/shared/domain/UniqueEntityID";
import { SolicitationEntity } from "src/shared/infra/database/typeorm/entities/solicitation.entity";
import { DeepPartial } from "typeorm";
import { Solicitation, SolicitationProps } from "../domain/solicitation/Solicitation";
import { PersonMapper } from "./personMap";

export class SolicitationMapper {
  static toDomain(dbSolicitation: SolicitationEntity): Solicitation {
    const solicitationProps = {
        person: dbSolicitation.person,
        status: dbSolicitation.status,
        contract: dbSolicitation.contract,
        origin: dbSolicitation.origin,
        type: dbSolicitation.type,
        serviceKey: dbSolicitation.serviceKey,
        subServiceKey: dbSolicitation.subServiceKey,
        companyKey: dbSolicitation.companyKey,
        amount: dbSolicitation.amount,
        externalId: dbSolicitation.externalId,
        metadata: dbSolicitation.metadata,
        roomId: dbSolicitation.roomId,
        productKey: dbSolicitation.productKey
    } as SolicitationProps;

    return Solicitation.create(solicitationProps, UniqueEntityID.create(dbSolicitation._id));
  }

  static toPersistence(solicitation: Solicitation): DeepPartial<SolicitationEntity> {
    const personInterface = PersonMapper.toDto(solicitation.person);
    return {
      _id: solicitation?.id.toValue(),
      person: personInterface,
      status: solicitation?.status,
      contract: solicitation?.contract,
      origin: solicitation?.origin,
      type: solicitation?.type,
      serviceKey: solicitation.serviceKey,
      subServiceKey: solicitation.subServiceKey,
      companyKey: solicitation.companyKey,
      amount: solicitation.amount,
      externalId: solicitation.externalId,
      metadata: solicitation.metadata,
      roomId: solicitation.roomId,
      split: solicitation?.split,
      productKey: solicitation?.productKey,
    };
  }

  static toDto(solicitation?: Solicitation): ISolicitation {
    return {
        person: solicitation?.person,
        status: solicitation?.status,
        contract: solicitation?.contract,
        origin: solicitation?.origin,
        type: solicitation?.type,
        serviceKey: solicitation ? solicitation.serviceKey : '',
        subServiceKey: solicitation ?  solicitation.subServiceKey : '',
        companyKey: solicitation ? solicitation.companyKey : '',
        amount: solicitation?.amount || 0,
        externalId: solicitation?.externalId || '',
        metadata: solicitation?.metadata,
        roomId: solicitation?.roomId,
        productKey: solicitation?.productKey || '',

    };
  }
}
