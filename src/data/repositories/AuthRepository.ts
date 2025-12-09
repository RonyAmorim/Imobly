import { User } from '@domain/entities/User';
import { IAuthRepository, LoginDTO, RegisterDTO } from '@domain/repositories/IAuthRepository';
import { AuthLocalDataSource } from '../datasources/local/AuthLocalDataSource';

export class AuthRepository implements IAuthRepository {
  constructor(private authDataSource: AuthLocalDataSource) {}

  async login(data: LoginDTO): Promise<User> {
    return await this.authDataSource.login(data.email, data.password);
  }

  async register(data: RegisterDTO): Promise<User> {
    return await this.authDataSource.register(data.name, data.email, data.password, data.role);
  }

  async getCurrentUser(): Promise<User | null> {
    return await this.authDataSource.getCurrentUser();
  }

  async logout(): Promise<void> {
    await this.authDataSource.logout();
  }
}
