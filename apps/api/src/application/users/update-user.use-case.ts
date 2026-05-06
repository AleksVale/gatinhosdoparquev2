import { ApplicationError } from '../errors/application-error';
import { UpdateUserInput, UserRepository } from './user-repository';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, input: UpdateUserInput) {
    const existingUserRecord = await this.userRepository.findPublicUserById(userId);

    if (!existingUserRecord) {
      throw new ApplicationError('not_found', `User with id "${userId}" not found`);
    }

    return this.userRepository.updateUser(userId, input);
  }
}
