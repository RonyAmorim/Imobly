import { InvalidPasswordError } from '../errors';

export class Password {
  private readonly value: string;
  private static readonly MIN_LENGTH = 6;

  private constructor(value: string) {
    this.value = value;
  }

  static create(password: string): Password {
    if (!password) {
      throw new InvalidPasswordError('Senha é obrigatória');
    }

    if (password.length < this.MIN_LENGTH) {
      throw new InvalidPasswordError(`Senha deve ter no mínimo ${this.MIN_LENGTH} caracteres`);
    }

    return new Password(password);
  }

  static isValid(password: string): boolean {
    return password !== undefined && password !== null && password.length >= this.MIN_LENGTH;
  }

  getValue(): string {
    return this.value;
  }
}
