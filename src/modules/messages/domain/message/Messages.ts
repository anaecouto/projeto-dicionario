import { WatchedList } from 'src/shared/domain/WatchedList';
import { Message } from './Message';

export class Messages extends WatchedList<Message> {
  private constructor(initialVotes: Message[]) {
    super(initialVotes);
  }

  public compareItems(a: Message, b: Message): boolean {
    return a.equals(b);
  }

  public static create(comments?: Message[]): Messages {
    return new Messages(comments ? comments : []);
  }
}
