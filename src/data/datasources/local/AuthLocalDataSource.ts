import { User, UserRole } from '@domain/entities/User';
import { AsyncStorageDataSource } from './AsyncStorageDataSource';
import { UserModel, UserMapper } from '../../models/UserModel';

export class AuthLocalDataSource {
  private readonly USER_KEY = '@imobly:user';
  private readonly USERS_LIST_KEY = '@imobly:users_list';
  private readonly PASSWORDS_KEY = '@imobly:passwords';

  constructor(private asyncStorage: AsyncStorageDataSource) {}

  async login(email: string, password: string): Promise<User> {
    const userModels = await this.asyncStorage.load<UserModel[]>(this.USERS_LIST_KEY);
    const userModel = userModels?.find((u) => u.email === email.toLowerCase().trim());

    if (!userModel) {
      console.error('[AuthLocalDataSource] Login - usuário não encontrado');
      throw new Error('Credenciais inválidas');
    }

    const passwords = await this.asyncStorage.load<Record<string, string>>(
      this.PASSWORDS_KEY,
    );
    const savedPassword = passwords?.[userModel.id];

    if (savedPassword !== password) {
      console.error('[AuthLocalDataSource] Login - senha incorreta');
      throw new Error('Credenciais inválidas');
    }

    const user = UserMapper.toEntity(userModel);
    await this.saveCurrentUser(user);
    return user;
  }

  async register(name: string, email: string, password: string, role: UserRole): Promise<User> {
    const userModels = (await this.asyncStorage.load<UserModel[]>(this.USERS_LIST_KEY)) || [];

    const emailExists = userModels.some((u) => u.email === email.toLowerCase().trim());
    if (emailExists) {
      throw new Error('Email já cadastrado');
    }

    const newUser: User = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role,
      createdAt: new Date(),
    };

    const newUserModel = UserMapper.fromEntity(newUser);
    userModels.push(newUserModel);
    await this.asyncStorage.save(this.USERS_LIST_KEY, userModels);

    const passwords = (await this.asyncStorage.load<Record<string, string>>(
      this.PASSWORDS_KEY,
    )) || {};
    passwords[newUser.id] = password;
    await this.asyncStorage.save(this.PASSWORDS_KEY, passwords);

    await this.saveCurrentUser(newUser);
    return newUser;
  }

  async getCurrentUser(): Promise<User | null> {
    const userModel = await this.asyncStorage.load<UserModel>(this.USER_KEY);
    return userModel ? UserMapper.toEntity(userModel) : null;
  }

  async logout(): Promise<void> {
    await this.asyncStorage.remove(this.USER_KEY);
  }

  private async saveCurrentUser(user: User): Promise<void> {
    const userModel = UserMapper.fromEntity(user);
    await this.asyncStorage.save(this.USER_KEY, userModel);
  }
}
