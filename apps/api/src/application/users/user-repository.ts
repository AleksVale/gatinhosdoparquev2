import { PublicUserRecord, UserRecord, UserRole } from '../../domain/users/user.types';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
}

export interface UserRepository {
  listUsers(): Promise<PublicUserRecord[]>;
  findPublicUserById(userId: string): Promise<PublicUserRecord | null>;
  findUserByEmail(email: string): Promise<UserRecord | null>;
  createUser(input: CreateUserInput): Promise<UserRecord>;
  updateUser(userId: string, input: UpdateUserInput): Promise<PublicUserRecord>;
  deleteUser(userId: string): Promise<void>;
}
