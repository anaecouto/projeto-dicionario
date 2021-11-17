interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects são objetos que representam um valor, mas possuem comportamentos
 * por exemplo, um ValueObject de "senha" pode possuir o comportamento de validar
 * ou mesmo de fazer o hash de uma string passada para ela.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
  public props: T;

  constructor(props: T) {
    const baseProps: any = {
      ...props,
    };

    this.props = baseProps;
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}
