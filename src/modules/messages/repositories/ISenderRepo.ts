import { Sender } from '../domain/sender/Sender';

export interface ISenderRepo {
  save(sender: Sender): Promise<void>;
  findSenderByName(name: string): Promise<Sender | undefined>;
}
