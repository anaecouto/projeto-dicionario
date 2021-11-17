import AppError from 'src/shared/core/errors/AppError';
import { ValueObject } from 'src/shared/domain/ValueObject';
import { Guard } from 'src/shared/utils/Guard';

export interface MessageTextProps {
  value: string;
}

export class MessageText extends ValueObject<MessageTextProps> {
  private static minLength = 2;

  private static maxLength = 100;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: MessageTextProps) {
    super(props);
  }

  static create(props: MessageTextProps) {
    const minLengthGuard = Guard.againstAtLeast(this.minLength, props.value);
    const maxLengthGuard = Guard.againstAtMost(this.maxLength, props.value);

    if (!minLengthGuard.succeeded) {
      throw new AppError(minLengthGuard.message, {
        status: 400,
      });
    }

    if (!maxLengthGuard.succeeded) {
      throw new AppError(maxLengthGuard.message, {
        status: 400,
      });
    }

    return new MessageText(props);
  }
}
