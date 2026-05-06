import { Module } from '@nestjs/common';
import { ADOPTION_REPOSITORY, AdoptionRepository } from './adoptions/adoption-repository';
import { GetAdoptionByIdUseCase } from './adoptions/get-adoption-by-id.use-case';
import { ListAdoptionsUseCase } from './adoptions/list-adoptions.use-case';
import { RequestAdoptionUseCase } from './adoptions/request-adoption.use-case';
import { UpdateAdoptionUseCase } from './adoptions/update-adoption.use-case';
import { AuthenticateUserUseCase } from './auth/authenticate-user.use-case';
import { PASSWORD_HASHER, PasswordHasher } from './auth/password-hasher';
import { TOKEN_GENERATOR, TokenGenerator } from './auth/token-generator';
import { CAT_REPOSITORY, CatRepository } from './cats/cat-repository';
import { CreateCatUseCase } from './cats/create-cat.use-case';
import { DeleteCatUseCase } from './cats/delete-cat.use-case';
import { GetCatByIdUseCase } from './cats/get-cat-by-id.use-case';
import { ListCatsUseCase } from './cats/list-cats.use-case';
import { UpdateCatUseCase } from './cats/update-cat.use-case';
import { CreateUserUseCase } from './users/create-user.use-case';
import { DeleteUserUseCase } from './users/delete-user.use-case';
import { GetUserByIdUseCase } from './users/get-user-by-id.use-case';
import { ListUsersUseCase } from './users/list-users.use-case';
import { UpdateUserUseCase } from './users/update-user.use-case';
import { USER_REPOSITORY, UserRepository } from './users/user-repository';
import { AuthInfrastructureModule } from '../infrastructure/auth/auth-infrastructure.module';
import { DatabaseInfrastructureModule } from '../infrastructure/database/database-infrastructure.module';

@Module({
  imports: [DatabaseInfrastructureModule, AuthInfrastructureModule],
  providers: [
    { provide: ListCatsUseCase, useFactory: (catRepository: CatRepository) => new ListCatsUseCase(catRepository), inject: [CAT_REPOSITORY] },
    { provide: GetCatByIdUseCase, useFactory: (catRepository: CatRepository) => new GetCatByIdUseCase(catRepository), inject: [CAT_REPOSITORY] },
    { provide: CreateCatUseCase, useFactory: (catRepository: CatRepository) => new CreateCatUseCase(catRepository), inject: [CAT_REPOSITORY] },
    { provide: UpdateCatUseCase, useFactory: (catRepository: CatRepository) => new UpdateCatUseCase(catRepository), inject: [CAT_REPOSITORY] },
    { provide: DeleteCatUseCase, useFactory: (catRepository: CatRepository) => new DeleteCatUseCase(catRepository), inject: [CAT_REPOSITORY] },
    { provide: ListUsersUseCase, useFactory: (userRepository: UserRepository) => new ListUsersUseCase(userRepository), inject: [USER_REPOSITORY] },
    { provide: GetUserByIdUseCase, useFactory: (userRepository: UserRepository) => new GetUserByIdUseCase(userRepository), inject: [USER_REPOSITORY] },
    { provide: CreateUserUseCase, useFactory: (userRepository: UserRepository, passwordHasher: PasswordHasher) => new CreateUserUseCase(userRepository, passwordHasher), inject: [USER_REPOSITORY, PASSWORD_HASHER] },
    { provide: UpdateUserUseCase, useFactory: (userRepository: UserRepository) => new UpdateUserUseCase(userRepository), inject: [USER_REPOSITORY] },
    { provide: DeleteUserUseCase, useFactory: (userRepository: UserRepository) => new DeleteUserUseCase(userRepository), inject: [USER_REPOSITORY] },
    { provide: AuthenticateUserUseCase, useFactory: (userRepository: UserRepository, passwordHasher: PasswordHasher, tokenGenerator: TokenGenerator) => new AuthenticateUserUseCase(userRepository, passwordHasher, tokenGenerator), inject: [USER_REPOSITORY, PASSWORD_HASHER, TOKEN_GENERATOR] },
    { provide: ListAdoptionsUseCase, useFactory: (adoptionRepository: AdoptionRepository) => new ListAdoptionsUseCase(adoptionRepository), inject: [ADOPTION_REPOSITORY] },
    { provide: GetAdoptionByIdUseCase, useFactory: (adoptionRepository: AdoptionRepository) => new GetAdoptionByIdUseCase(adoptionRepository), inject: [ADOPTION_REPOSITORY] },
    { provide: RequestAdoptionUseCase, useFactory: (adoptionRepository: AdoptionRepository, catRepository: CatRepository) => new RequestAdoptionUseCase(adoptionRepository, catRepository), inject: [ADOPTION_REPOSITORY, CAT_REPOSITORY] },
    { provide: UpdateAdoptionUseCase, useFactory: (adoptionRepository: AdoptionRepository) => new UpdateAdoptionUseCase(adoptionRepository), inject: [ADOPTION_REPOSITORY] },
  ],
  exports: [ListCatsUseCase, GetCatByIdUseCase, CreateCatUseCase, UpdateCatUseCase, DeleteCatUseCase, ListUsersUseCase, GetUserByIdUseCase, CreateUserUseCase, UpdateUserUseCase, DeleteUserUseCase, AuthenticateUserUseCase, ListAdoptionsUseCase, GetAdoptionByIdUseCase, RequestAdoptionUseCase, UpdateAdoptionUseCase],
})
export class ApplicationModule {}
