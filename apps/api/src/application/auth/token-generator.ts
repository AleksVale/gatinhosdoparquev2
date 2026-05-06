import { UserRole } from '../../domain/users/user.types';

export const TOKEN_GENERATOR = Symbol('TOKEN_GENERATOR');

export interface AuthTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface TokenGenerator {
  sign(payload: AuthTokenPayload): string;
}
