import { Injectable } from '@nestjs/common';
import { UserRole as DatabaseUserRole, type User } from '@repo/database';
import { CreateUserInput, UpdateUserInput, UserRepository } from '../../../application/users/user-repository';
import { PublicUserRecord, UserRecord, UserRole } from '../../../domain/users/user.types';
import { PrismaService } from './prisma.service';

const publicUserSelect = { id: true, name: true, email: true, phone: true, role: true, createdAt: true, updatedAt: true };

type DatabasePublicUserRecord = Omit<User, 'password'>;

@Injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async listUsers(): Promise<PublicUserRecord[]> {
    const userRecords = await this.prismaService.user.findMany({ select: publicUserSelect, orderBy: { createdAt: 'desc' } });
    return userRecords.map((userRecord) => this.toPublicUserRecord(userRecord));
  }

  async findPublicUserById(userId: string): Promise<PublicUserRecord | null> {
    const userRecord = await this.prismaService.user.findUnique({ where: { id: userId }, select: publicUserSelect });
    return userRecord ? this.toPublicUserRecord(userRecord) : null;
  }

  async findUserByEmail(email: string): Promise<UserRecord | null> {
    const userRecord = await this.prismaService.user.findUnique({ where: { email } });
    return userRecord ? this.toUserRecord(userRecord) : null;
  }

  async createUser(input: CreateUserInput): Promise<UserRecord> {
    const userRecord = await this.prismaService.user.create({ data: { ...input, role: input.role as DatabaseUserRole | undefined } });
    return this.toUserRecord(userRecord);
  }

  async updateUser(userId: string, input: UpdateUserInput): Promise<PublicUserRecord> {
    const userRecord = await this.prismaService.user.update({ where: { id: userId }, data: { ...input, role: input.role as DatabaseUserRole | undefined }, select: publicUserSelect });
    return this.toPublicUserRecord(userRecord);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id: userId } });
  }

  private toUserRecord(userRecord: User): UserRecord {
    return { ...userRecord, role: userRecord.role as UserRole };
  }

  private toPublicUserRecord(userRecord: DatabasePublicUserRecord): PublicUserRecord {
    return { ...userRecord, role: userRecord.role as UserRole };
  }
}
