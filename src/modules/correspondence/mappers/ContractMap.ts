import { IContract } from 'src/shared/core/interfaces/contract.interface';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { ContractEntity } from 'src/shared/infra/database/typeorm/entities/contract.entity';
import { MessageEntity } from 'src/shared/infra/database/typeorm/entities/message.entity';
import { DeepPartial } from 'typeorm';
import { Contract, ContractProps } from '../domain/contract/Contract';


export class ContractMapper {
  static toDomain(dbContract: ContractEntity): Contract {
    const contractProps = {
      agency: dbContract.agency,
      account: dbContract.account,
      document: dbContract.document,
      name: dbContract.name,
      state: dbContract.state,
      sex: dbContract.sex,
      birthDate: dbContract.birthDate,
      status: dbContract.status,
      phones: dbContract.phones,
      options: dbContract.options,
    } as ContractProps;

    return Contract.create(contractProps, UniqueEntityID.create(dbContract._id));
  }

  static toPersistence(contract: Contract): DeepPartial<ContractEntity> {
    return {
      _id: contract.id.toValue(),
      agency: contract.agency, 
      account: contract.account, 
      document: contract.document, 
      name: contract.name, 
      state: contract.state, 
      sex: contract.sex, 
      birthDate: contract.birthDate, 
      status: contract.status, 
      phones: contract.phones, 
      options: contract.options, 
    };
  }

  static toInterface(contract: Contract):IContract {
    return {
      _id: contract.id.toValue(),
      agency: contract.agency, 
      account: contract.account, 
      document: contract.document, 
      name: contract.name, 
      state: contract.state, 
      sex: contract.sex, 
      birthDate: contract.birthDate, 
      status: contract.status, 
      phones: contract.phones, 
      options: contract.options, 
    };
  }
}
