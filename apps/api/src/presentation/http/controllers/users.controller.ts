import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from '../../../application/users/create-user.use-case';
import { DeleteUserUseCase } from '../../../application/users/delete-user.use-case';
import { GetUserByIdUseCase } from '../../../application/users/get-user-by-id.use-case';
import { ListUsersUseCase } from '../../../application/users/list-users.use-case';
import { UpdateUserUseCase } from '../../../application/users/update-user.use-case';
import { UserRole } from '../../../domain/users/user.types';
import { Roles } from '../decorators/roles.decorator';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { UpdateUserDto } from '../dtos/users/update-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all users (admin only)' })
  findAll() {
    return this.listUsersUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') userId: string) {
    return this.getUserByIdUseCase.execute(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  update(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(userId, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user (admin only)' })
  remove(@Param('id') userId: string) {
    return this.deleteUserUseCase.execute(userId);
  }
}
