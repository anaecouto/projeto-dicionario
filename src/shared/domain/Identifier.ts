/**
 * @desc Um identificador pode ser uma string, numero, uuid, objectId...
 */
export abstract class Identifier<T> {
  constructor(private value: T) {
    this.value = value;
  }

  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this.value;
  }

  toString() {
    return String(this.value);
  }

  /**
   * Retorna o valor real de um identificador
   */

  toValue(): T {
    return this.value;
  }
}
