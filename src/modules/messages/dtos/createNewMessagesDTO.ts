export interface ICreateNewMessagesRequestDTO {
  sender: string;
  messages: string[];
}

export interface ICreateNewMessagesResponseDTO {
  newMessages: number;
  totalMessages: number;
}
