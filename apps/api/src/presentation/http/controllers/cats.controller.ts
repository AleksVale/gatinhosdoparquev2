import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCatUseCase } from '../../../application/cats/create-cat.use-case';
import { DeleteCatUseCase } from '../../../application/cats/delete-cat.use-case';
import { GetCatByIdUseCase } from '../../../application/cats/get-cat-by-id.use-case';
import { ListCatsUseCase } from '../../../application/cats/list-cats.use-case';
import { UpdateCatUseCase } from '../../../application/cats/update-cat.use-case';
import { UserRole } from '../../../domain/users/user.types';
import { Roles } from '../decorators/roles.decorator';
import { CreateCatDto } from '../dtos/cats/create-cat.dto';
import { QueryCatsDto } from '../dtos/cats/query-cats.dto';
import { UpdateCatDto } from '../dtos/cats/update-cat.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('cats')
@Controller({ path: 'cats', version: '1' })
export class CatsController {
  constructor(
    private readonly listCatsUseCase: ListCatsUseCase,
    private readonly getCatByIdUseCase: GetCatByIdUseCase,
    private readonly createCatUseCase: CreateCatUseCase,
    private readonly updateCatUseCase: UpdateCatUseCase,
    private readonly deleteCatUseCase: DeleteCatUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all cats' })
  @ApiResponse({ status: 200, description: 'List of cats' })
  findAll(@Query() queryCatsDto: QueryCatsDto) {
    return this.listCatsUseCase.execute(queryCatsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cat by ID' })
  findOne(@Param('id') catId: string) {
    return this.getCatByIdUseCase.execute(catId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VOLUNTEER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new cat (admin/volunteer only)' })
  create(@Body() createCatDto: CreateCatDto) {
    return this.createCatUseCase.execute(createCatDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VOLUNTEER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a cat (admin/volunteer only)' })
  update(@Param('id') catId: string, @Body() updateCatDto: UpdateCatDto) {
    return this.updateCatUseCase.execute(catId, updateCatDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a cat (admin only)' })
  remove(@Param('id') catId: string) {
    return this.deleteCatUseCase.execute(catId);
  }
}
