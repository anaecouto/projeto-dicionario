import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SenderEntity } from 'src/shared/infra/database/typeorm/entities/sender.entity';
import { Repository } from 'typeorm';
import { Sender } from '../../domain/sender/Sender';
import { SenderMapper } from '../../mappers/SenderMap';
import { ISenderRepo } from '../ISenderRepo';

@Injectable()
export class SenderRepoTypeOrm implements ISenderRepo {
  constructor(
    @InjectRepository(SenderEntity)
    private senderTypeOrmRepo: Repository<SenderEntity>,
  ) {}

  async findSenderByName(name: string): Promise<Sender | undefined> {
    const found = await this.senderTypeOrmRepo.findOne(
      { name },
      {
        relations: ['messages'],
      },
    );

    if (!found) {
      return;
    }

    return SenderMapper.toDomain(found);
  }

  async save(sender: Sender): Promise<void> {
    const rawSender = SenderMapper.toPersistence(sender);

    await this.senderTypeOrmRepo.save(rawSender);
    return;
  }
}
