import { PublicUserRecord } from '../../domain/users/user.types';
import { PasswordHasher } from '../auth/password-hasher';
import { ApplicationError } from '../errors/application-error';
import { CreateUserInput, UserRepository } from './user-repository';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(input: CreateUserInput): Promise<PublicUserRecord> {
    const existingUserRecord = await this.userRepository.findUserByEmail(input.email);

    if (existingUserRecord) {
      throw new ApplicationError('conflict', 'Email already in use');
    }

    const hashedPassword = await this.passwordHasher.hash(input.password);
    const createdUserRecord = await this.userRepository.createUser({ ...input, password: hashedPassword });
    const { password: removedPassword, ...publicUserRecord } = createdUserRecord;
    void removedPassword;

    return publicUserRecord;
  }
}
