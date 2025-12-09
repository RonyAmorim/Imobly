import { User, UserRole } from '../entities/User';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface IAuthRepository {
  login(data: LoginDTO): Promise<User>;
  register(data: RegisterDTO): Promise<User>;
  getCurrentUser(): Promise<User | null>;
  logout(): Promise<void>;
}
