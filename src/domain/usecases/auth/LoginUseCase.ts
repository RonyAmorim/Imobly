import { User } from '../../entities/User';
import { IAuthRepository, LoginDTO } from '../../repositories/IAuthRepository';
import { Email } from '../../value-objects/Email';
import { Password } from '../../value-objects/Password';

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: LoginDTO): Promise<User> {
    // Validate inputs using Value Objects
    const emailVO = Email.create(data.email);
    const passwordVO = Password.create(data.password);

    const user = await this.authRepository.login({
      email: emailVO.getValue(),
      password: passwordVO.getValue(),
    });
    
    return user;
  }
}
