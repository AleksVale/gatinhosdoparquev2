import { Global, Module } from '@nestjs/common';
import { ADOPTION_REPOSITORY } from '../../application/adoptions/adoption-repository';
import { CAT_REPOSITORY } from '../../application/cats/cat-repository';
import { USER_REPOSITORY } from '../../application/users/user-repository';
import { PrismaAdoptionsRepository } from './prisma/prisma-adoptions.repository';
import { PrismaCatsRepository } from './prisma/prisma-cats.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/prisma-users.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    PrismaCatsRepository,
    PrismaUsersRepository,
    PrismaAdoptionsRepository,
    { provide: CAT_REPOSITORY, useExisting: PrismaCatsRepository },
    { provide: USER_REPOSITORY, useExisting: PrismaUsersRepository },
    { provide: ADOPTION_REPOSITORY, useExisting: PrismaAdoptionsRepository },
  ],
  exports: [CAT_REPOSITORY, USER_REPOSITORY, ADOPTION_REPOSITORY, PrismaService],
})
export class DatabaseInfrastructureModule {}
