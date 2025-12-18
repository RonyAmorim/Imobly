import { User } from '../../entities/User';
import { IAuthRepository, RegisterDTO } from '../../repositories/IAuthRepository';
import { Email } from '../../value-objects/Email';
import { Password } from '../../value-objects/Password';

export class RegisterUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: RegisterDTO): Promise<User> {
    // Validate inputs using Value Objects
    // This ensures that we never proceed with invalid domain data
    if (!data.name || data.name.trim().length < 3) {
      throw new Error('Nome deve ter no mínimo 3 caracteres');
    }

    const emailVO = Email.create(data.email);
    const passwordVO = Password.create(data.password);

    // If validation passes, we pass the raw strings to the repository
    // In a stricter implementation, the Repository interface could accept Value Objects,
    // but we keep it simple here by passing the validated string values.
    const user = await this.authRepository.register({
      ...data,
      email: emailVO.getValue(),
      password: passwordVO.getValue(),
    });
    
    return user;
  }
}
