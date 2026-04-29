import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { QueryCatsDto } from './dto/query-cats.dto';

@Injectable()
export class CatsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryCatsDto) {
    const { page = 1, limit = 10, status, gender } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status }),
      ...(gender && { gender }),
    };

    const [data, total] = await Promise.all([
      this.prisma.cat.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.cat.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const cat = await this.prisma.cat.findUnique({ where: { id } });
    if (!cat) {
      throw new NotFoundException(`Cat with id "${id}" not found`);
    }
    return cat;
  }

  async create(createCatDto: CreateCatDto) {
    return this.prisma.cat.create({ data: createCatDto });
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    await this.findOne(id);
    return this.prisma.cat.update({ where: { id }, data: updateCatDto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.cat.delete({ where: { id } });
  }
}
