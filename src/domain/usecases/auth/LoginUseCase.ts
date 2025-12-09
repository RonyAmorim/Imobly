import { User } from '../../entities/User';
import { IAuthRepository, LoginDTO } from '../../repositories/IAuthRepository';

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: LoginDTO): Promise<User> {
    this.validateInput(data);
    const user = await this.authRepository.login(data);
    return user;
  }

  private validateInput(data: LoginDTO): void {
    if (!data.email || !data.password) {
      throw new Error('Email e senha são obrigatórios');
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
