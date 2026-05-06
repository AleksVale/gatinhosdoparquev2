import { PublicUserRecord } from '../../domain/users/user.types';
import { ApplicationError } from '../errors/application-error';
import { UserRepository } from '../users/user-repository';
import { PasswordHasher } from './password-hasher';
import { TokenGenerator } from './token-generator';

export interface AuthenticationSession {
  accessToken: string;
  user: Pick<PublicUserRecord, 'id' | 'name' | 'email' | 'role'>;
}

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  async execute(email: string, password: string): Promise<AuthenticationSession> {
    const userRecord = await this.userRepository.findUserByEmail(email);

    if (!userRecord) {
      throw new ApplicationError('unauthorized', 'Invalid credentials');
    }

    const isPasswordValid = await this.passwordHasher.compare(password, userRecord.password);

    if (!isPasswordValid) {
      throw new ApplicationError('unauthorized', 'Invalid credentials');
    }

    return {
      accessToken: this.tokenGenerator.sign({ sub: userRecord.id, email: userRecord.email, role: userRecord.role }),
      user: { id: userRecord.id, name: userRecord.name, email: userRecord.email, role: userRecord.role },
    };
  }
}
