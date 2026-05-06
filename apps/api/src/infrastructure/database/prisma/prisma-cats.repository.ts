import { Injectable } from '@nestjs/common';
import { CatGender as DatabaseCatGender, CatStatus as DatabaseCatStatus, type Cat } from '@repo/database';
import { CatFilters, CatRepository, CreateCatInput, UpdateCatInput } from '../../../application/cats/cat-repository';
import { buildPaginationMeta, PaginatedResponse } from '../../../application/common/paginated-response';
import { CatGender, CatRecord, CatStatus } from '../../../domain/cats/cat.types';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaCatsRepository implements CatRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async listCats(filters: CatFilters): Promise<PaginatedResponse<CatRecord>> {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const skip = (page - 1) * limit;
    const where = {
      ...(filters.status && { status: filters.status as DatabaseCatStatus }),
      ...(filters.gender && { gender: filters.gender as DatabaseCatGender }),
    };
    const [catRecords, total] = await Promise.all([
      this.prismaService.cat.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prismaService.cat.count({ where }),
    ]);

    return { data: catRecords.map((catRecord) => this.toDomainCatRecord(catRecord)), meta: buildPaginationMeta(total, page, limit) };
  }

  async findCatById(catId: string): Promise<CatRecord | null> {
    const catRecord = await this.prismaService.cat.findUnique({ where: { id: catId } });
    return catRecord ? this.toDomainCatRecord(catRecord) : null;
  }

  async createCat(input: CreateCatInput): Promise<CatRecord> {
    const catRecord = await this.prismaService.cat.create({ data: this.toCreateCatData(input) });
    return this.toDomainCatRecord(catRecord);
  }

  async updateCat(catId: string, input: UpdateCatInput): Promise<CatRecord> {
    const catRecord = await this.prismaService.cat.update({ where: { id: catId }, data: this.toUpdateCatData(input) });
    return this.toDomainCatRecord(catRecord);
  }

  async deleteCat(catId: string): Promise<void> {
    await this.prismaService.cat.delete({ where: { id: catId } });
  }

  private toDomainCatRecord(catRecord: Cat): CatRecord {
    return { ...catRecord, status: catRecord.status as CatStatus, gender: catRecord.gender as CatGender };
  }

  private toCreateCatData(input: CreateCatInput) {
    return { ...input, status: input.status as DatabaseCatStatus | undefined, gender: input.gender as DatabaseCatGender };
  }

  private toUpdateCatData(input: UpdateCatInput) {
    return { ...input, status: input.status as DatabaseCatStatus | undefined, gender: input.gender as DatabaseCatGender | undefined };
  }
}
