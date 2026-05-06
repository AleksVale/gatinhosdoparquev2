import { Injectable } from '@nestjs/common';
import { AdoptionStatus as DatabaseAdoptionStatus, CatStatus as DatabaseCatStatus, type Adoption, type Cat, type User } from '@repo/database';
import { AdoptionRepository, CreateAdoptionInput, UpdateAdoptionInput } from '../../../application/adoptions/adoption-repository';
import { buildPaginationMeta, PaginatedResponse, PaginationInput } from '../../../application/common/paginated-response';
import { AdoptionDetailsRecord, AdoptionStatus } from '../../../domain/adoptions/adoption.types';
import { CatGender, CatRecord, CatStatus } from '../../../domain/cats/cat.types';
import { PublicUserRecord, UserRole } from '../../../domain/users/user.types';
import { PrismaService } from './prisma.service';

interface AdoptionWithDetails extends Adoption {
  cat: Cat;
  adopter: Pick<User, 'id' | 'name' | 'email' | 'phone' | 'role' | 'createdAt' | 'updatedAt'>;
}

const adoptionDetailsInclude = {
  cat: true,
  adopter: { select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true, updatedAt: true } },
};

@Injectable()
export class PrismaAdoptionsRepository implements AdoptionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async listAdoptions(input: PaginationInput): Promise<PaginatedResponse<AdoptionDetailsRecord>> {
    const page = input.page ?? 1;
    const limit = input.limit ?? 10;
    const skip = (page - 1) * limit;
    const [adoptionRecords, total] = await Promise.all([
      this.prismaService.adoption.findMany({ skip, take: limit, include: adoptionDetailsInclude, orderBy: { createdAt: 'desc' } }),
      this.prismaService.adoption.count(),
    ]);

    return { data: adoptionRecords.map((adoptionRecord) => this.toAdoptionDetailsRecord(adoptionRecord)), meta: buildPaginationMeta(total, page, limit) };
  }

  async findAdoptionById(adoptionId: string): Promise<AdoptionDetailsRecord | null> {
    const adoptionRecord = await this.prismaService.adoption.findUnique({ where: { id: adoptionId }, include: adoptionDetailsInclude });
    return adoptionRecord ? this.toAdoptionDetailsRecord(adoptionRecord) : null;
  }

  async createAdoption(input: CreateAdoptionInput): Promise<AdoptionDetailsRecord> {
    const adoptionRecord = await this.prismaService.$transaction(async (transaction) => {
      const createdAdoptionRecord = await transaction.adoption.create({ data: input, include: adoptionDetailsInclude });
      await transaction.cat.update({ where: { id: input.catId }, data: { status: DatabaseCatStatus.RESERVED } });
      return createdAdoptionRecord;
    });

    return this.toAdoptionDetailsRecord(adoptionRecord);
  }

  async updateAdoption(adoptionId: string, input: UpdateAdoptionInput): Promise<AdoptionDetailsRecord> {
    const adoptionRecord = await this.prismaService.$transaction(async (transaction) => {
      const updatedAdoptionRecord = await transaction.adoption.update({ where: { id: adoptionId }, data: { ...input, status: input.status as DatabaseAdoptionStatus | undefined }, include: adoptionDetailsInclude });

      if (input.status === AdoptionStatus.COMPLETED) {
        await transaction.cat.update({ where: { id: updatedAdoptionRecord.catId }, data: { status: DatabaseCatStatus.ADOPTED } });
      }

      if (input.status === AdoptionStatus.REJECTED || input.status === AdoptionStatus.CANCELLED) {
        await transaction.cat.update({ where: { id: updatedAdoptionRecord.catId }, data: { status: DatabaseCatStatus.AVAILABLE } });
      }

      return updatedAdoptionRecord;
    });

    return this.toAdoptionDetailsRecord(adoptionRecord);
  }

  private toAdoptionDetailsRecord(adoptionRecord: AdoptionWithDetails): AdoptionDetailsRecord {
    return {
      id: adoptionRecord.id,
      catId: adoptionRecord.catId,
      adopterId: adoptionRecord.adopterId,
      status: adoptionRecord.status as AdoptionStatus,
      notes: adoptionRecord.notes,
      createdAt: adoptionRecord.createdAt,
      updatedAt: adoptionRecord.updatedAt,
      cat: this.toCatRecord(adoptionRecord.cat),
      adopter: this.toPublicUserRecord(adoptionRecord.adopter),
    };
  }

  private toCatRecord(catRecord: Cat): CatRecord {
    return { ...catRecord, status: catRecord.status as CatStatus, gender: catRecord.gender as CatGender };
  }

  private toPublicUserRecord(userRecord: AdoptionWithDetails['adopter']): PublicUserRecord {
    return { ...userRecord, role: userRecord.role as UserRole };
  }
}
