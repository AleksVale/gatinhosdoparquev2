import { UserRepository } from './user-repository';

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute() {
    return this.userRepository.listUsers();
  }
}
