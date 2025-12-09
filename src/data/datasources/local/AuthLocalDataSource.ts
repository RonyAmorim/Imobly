import { User, UserRole } from '@domain/entities/User';
import { AsyncStorageDataSource } from './AsyncStorageDataSource';

export class AuthLocalDataSource {
  private readonly USER_KEY = '@imobly:user';
  private readonly USERS_LIST_KEY = '@imobly:users_list';
  private readonly PASSWORDS_KEY = '@imobly:passwords';

  constructor(private asyncStorage: AsyncStorageDataSource) {}

  async login(email: string, password: string): Promise<User> {
    const users = await this.asyncStorage.load<User[]>(this.USERS_LIST_KEY);
    const user = users?.find((u) => u.email === email.toLowerCase().trim());

    if (!user) {
      console.error('[AuthLocalDataSource] Login - usuário não encontrado');
      throw new Error('Credenciais inválidas');
    }

    const passwords = await this.asyncStorage.load<Record<string, string>>(
      this.PASSWORDS_KEY,
    );
    const savedPassword = passwords?.[user.id];

    if (savedPassword !== password) {
      console.error('[AuthLocalDataSource] Login - senha incorreta');
      throw new Error('Credenciais inválidas');
    }

    await this.saveCurrentUser(user);
    return user;
  }

  async register(name: string, email: string, password: string, role: UserRole): Promise<User> {
    const users = (await this.asyncStorage.load<User[]>(this.USERS_LIST_KEY)) || [];

    const emailExists = users.some((u) => u.email === email.toLowerCase().trim());
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

    users.push(newUser);
    await this.asyncStorage.save(this.USERS_LIST_KEY, users);

    const passwords = (await this.asyncStorage.load<Record<string, string>>(
      this.PASSWORDS_KEY,
    )) || {};
    passwords[newUser.id] = password;
    await this.asyncStorage.save(this.PASSWORDS_KEY, passwords);

    await this.saveCurrentUser(newUser);
    return newUser;
  }

  async getCurrentUser(): Promise<User | null> {
    const user = await this.asyncStorage.load<User>(this.USER_KEY);
    return user || null;
  }

  async logout(): Promise<void> {
    await this.asyncStorage.remove(this.USER_KEY);
  }

  private async saveCurrentUser(user: User): Promise<void> {
    await this.asyncStorage.save(this.USER_KEY, user);
  }
}
