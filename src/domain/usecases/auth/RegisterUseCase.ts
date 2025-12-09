import { User } from '../../entities/User';
import { IAuthRepository, RegisterDTO } from '../../repositories/IAuthRepository';

export class RegisterUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: RegisterDTO): Promise<User> {
    this.validateInput(data);
    const user = await this.authRepository.register(data);
    return user;
  }

  private validateInput(data: RegisterDTO): void {
    if (!data.name || data.name.trim().length < 3) {
      throw new Error('Nome deve ter no mínimo 3 caracteres');
    }

    if (!data.email) {
      throw new Error('Email é obrigatório');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Email inválido');
    }

    if (data.password.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }
  }
}
