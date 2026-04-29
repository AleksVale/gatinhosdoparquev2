export enum UserRole {
  ADMIN = 'ADMIN',
  ADOPTER = 'ADOPTER',
  VOLUNTEER = 'VOLUNTEER',
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
}

export type UpdateUserDto = Partial<Omit<CreateUserDto, 'password'>>;

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
