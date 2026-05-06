import { ApplicationError } from '../errors/application-error';
import { UserRepository } from './user-repository';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string) {
    const publicUserRecord = await this.userRepository.findPublicUserById(userId);

    if (!publicUserRecord) {
      throw new ApplicationError('not_found', `User with id "${userId}" not found`);
    }

    return publicUserRecord;
  }
}
