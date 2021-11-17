import { IsString } from 'class-validator';
import { ICreateNewMessagesRequestDTO } from '../../dtos/createNewMessagesDTO';

export class CreateNewMessagesValidation
  implements ICreateNewMessagesRequestDTO {
  @IsString()
  sender: string;

  @IsString({
    each: true,
  })
  messages: string[];
}
