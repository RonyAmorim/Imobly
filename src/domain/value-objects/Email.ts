import { InvalidEmailError } from '../errors';

export class Email {
  private readonly value: string;
  // Regex simples e robusto para validação de email
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Cria uma instância de Email.
   * Lança InvalidEmailError se o formato for inválido.
   * Normaliza o email (trim + lowercase).
   */
  static create(email: string): Email {
    if (!email) {
      throw new InvalidEmailError('Email não pode ser vazio');
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!this.isValid(normalizedEmail)) {
      throw new InvalidEmailError(email);
    }

    return new Email(normalizedEmail);
  }

  /**
   * Verifica se a string é um email válido sem lançar exceção.
   * Útil para UI feedback antes do submit.
   */
  static isValid(email: string): boolean {
    return this.EMAIL_REGEX.test(email);
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
