export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super(`O email "${email}" é inválido.`);
    this.name = 'InvalidEmailError';
  }
}

export class InvalidPasswordError extends DomainError {
  constructor(message: string = 'Senha inválida.') {
    super(message);
    this.name = 'InvalidPasswordError';
  }
}
