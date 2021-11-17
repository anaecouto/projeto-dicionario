import { Message } from '../domain/message/Message';

export interface IMessagesRepo {
  getAllMessagesBySenderName(
    name: string,
  ): Promise<Message[] | undefined> | Message | undefined;
}
