import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/shared/core/IUseCase';
import { Message } from '../domain/message/Message';
import { Messages } from '../domain/message/Messages';
import { MessageText } from '../domain/message/MessageText';
import { Sender } from '../domain/sender/Sender';
import { SenderName } from '../domain/sender/SenderName';
import { ICreateNewMessagesRequestDTO, ICreateNewMessagesResponseDTO } from '../dtos/createNewMessagesDTO';
import { SenderRepoTypeOrm } from '../repositories/implementations/SenderRepoTypeOrm';
import { ISenderRepo } from '../repositories/ISenderRepo';

@Injectable()
export class CreateNewMessagesUseCase
  implements
    IUseCase<ICreateNewMessagesRequestDTO, ICreateNewMessagesResponseDTO> {
  constructor(@Inject(SenderRepoTypeOrm) private senderRepo: ISenderRepo) {}

  async execute(
    request: ICreateNewMessagesRequestDTO,
  ): Promise<ICreateNewMessagesResponseDTO> {
    const messages = request.messages.map((message) => {
      const messageText = MessageText.create({ value: message });

      return Message.create({
        text: messageText,
      });
    });

    let sender = await this.senderRepo.findSenderByName(request.sender);

    if (!sender) {
      const name = SenderName.create({ value: request.sender });

      sender = Sender.create({
        name,
        messages: Messages.create(),
      });
    }

    messages.forEach((message) => {
      sender?.addNewMessage(message);
    });

    await this.senderRepo.save(sender);

    return {
      newMessages: sender.newMessages.length,
      totalMessages: sender.currentMessages.length,
    };
  }
}
