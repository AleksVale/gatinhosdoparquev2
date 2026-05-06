import { ApplicationError } from '../errors/application-error';
import { UserRepository } from './user-repository';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string) {
    const existingUserRecord = await this.userRepository.findPublicUserById(userId);

    if (!existingUserRecord) {
      throw new ApplicationError('not_found', `User with id "${userId}" not found`);
    }

    await this.userRepository.deleteUser(userId);
  }
}
