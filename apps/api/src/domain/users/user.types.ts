export enum UserRole {
  ADMIN = 'ADMIN',
  ADOPTER = 'ADOPTER',
  VOLUNTEER = 'VOLUNTEER',
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type PublicUserRecord = Omit<UserRecord, 'password'>;
