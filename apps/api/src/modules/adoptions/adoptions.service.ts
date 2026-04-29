import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { CatStatus, AdoptionStatus } from '@repo/database';

@Injectable()
export class AdoptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.adoption.findMany({
        skip,
        take: limit,
        include: { cat: true, adopter: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.adoption.count(),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: string) {
    const adoption = await this.prisma.adoption.findUnique({
      where: { id },
      include: { cat: true, adopter: { select: { id: true, name: true, email: true } } },
    });
    if (!adoption) throw new NotFoundException(`Adoption with id "${id}" not found`);
    return adoption;
  }

  async create(createAdoptionDto: CreateAdoptionDto) {
    const cat = await this.prisma.cat.findUnique({ where: { id: createAdoptionDto.catId } });
    if (!cat) throw new NotFoundException(`Cat with id "${createAdoptionDto.catId}" not found`);
    if (cat.status !== CatStatus.AVAILABLE) {
      throw new BadRequestException(`Cat "${cat.name}" is not available for adoption`);
    }
    const [adoption] = await this.prisma.$transaction([
      this.prisma.adoption.create({ data: createAdoptionDto }),
      this.prisma.cat.update({
        where: { id: createAdoptionDto.catId },
        data: { status: CatStatus.RESERVED },
      }),
    ]);
    return adoption;
  }

  async update(id: string, updateAdoptionDto: UpdateAdoptionDto) {
    const adoption = await this.findOne(id);

    if (updateAdoptionDto.status === AdoptionStatus.COMPLETED) {
      await this.prisma.cat.update({
        where: { id: adoption.catId },
        data: { status: CatStatus.ADOPTED },
      });
    }

    if (
      updateAdoptionDto.status === AdoptionStatus.REJECTED ||
      updateAdoptionDto.status === AdoptionStatus.CANCELLED
    ) {
      await this.prisma.cat.update({
        where: { id: adoption.catId },
        data: { status: CatStatus.AVAILABLE },
      });
    }

    return this.prisma.adoption.update({ where: { id }, data: updateAdoptionDto });
  }
}
