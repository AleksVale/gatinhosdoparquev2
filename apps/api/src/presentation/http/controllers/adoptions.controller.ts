import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAdoptionByIdUseCase } from '../../../application/adoptions/get-adoption-by-id.use-case';
import { ListAdoptionsUseCase } from '../../../application/adoptions/list-adoptions.use-case';
import { RequestAdoptionUseCase } from '../../../application/adoptions/request-adoption.use-case';
import { UpdateAdoptionUseCase } from '../../../application/adoptions/update-adoption.use-case';
import { UserRole } from '../../../domain/users/user.types';
import { Roles } from '../decorators/roles.decorator';
import { CreateAdoptionDto } from '../dtos/adoptions/create-adoption.dto';
import { UpdateAdoptionDto } from '../dtos/adoptions/update-adoption.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('adoptions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'adoptions', version: '1' })
export class AdoptionsController {
  constructor(
    private readonly listAdoptionsUseCase: ListAdoptionsUseCase,
    private readonly getAdoptionByIdUseCase: GetAdoptionByIdUseCase,
    private readonly requestAdoptionUseCase: RequestAdoptionUseCase,
    private readonly updateAdoptionUseCase: UpdateAdoptionUseCase,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.VOLUNTEER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'List all adoptions (admin/volunteer only)' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.listAdoptionsUseCase.execute({ page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get adoption by ID' })
  findOne(@Param('id') adoptionId: string) {
    return this.getAdoptionByIdUseCase.execute(adoptionId);
  }

  @Post()
  @ApiOperation({ summary: 'Request an adoption' })
  create(@Body() createAdoptionDto: CreateAdoptionDto) {
    return this.requestAdoptionUseCase.execute(createAdoptionDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VOLUNTEER)
  @ApiOperation({ summary: 'Update adoption status (admin/volunteer only)' })
  update(@Param('id') adoptionId: string, @Body() updateAdoptionDto: UpdateAdoptionDto) {
    return this.updateAdoptionUseCase.execute(adoptionId, updateAdoptionDto);
  }
}
