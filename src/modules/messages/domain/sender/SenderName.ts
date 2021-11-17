import AppError from 'src/shared/core/errors/AppError';
import { ValueObject } from 'src/shared/domain/ValueObject';

export interface SenderNameProps {
  value: string;
}

export class SenderName extends ValueObject<SenderNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: SenderNameProps) {
    super(props);
  }

  static hasNumber(value: string): boolean {
    const reg = /^[A-Za-z]+$/;

    return !reg.test(value);
  }

  static create(props: SenderNameProps) {
    if (this.hasNumber(props.value)) {
      throw new AppError(
        'Username cannot contain numbers, whitespaces or symbols',
        {
          status: 400,
        },
      );
    }

    return new SenderName(props);
  }
}
