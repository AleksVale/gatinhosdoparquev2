import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdoptionsService } from './adoptions.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@repo/database';

@ApiTags('adoptions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'adoptions', version: '1' })
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.VOLUNTEER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'List all adoptions (admin/volunteer only)' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.adoptionsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get adoption by ID' })
  findOne(@Param('id') id: string) {
    return this.adoptionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Request an adoption' })
  create(@Body() createAdoptionDto: CreateAdoptionDto) {
    return this.adoptionsService.create(createAdoptionDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VOLUNTEER)
  @ApiOperation({ summary: 'Update adoption status (admin/volunteer only)' })
  update(@Param('id') id: string, @Body() updateAdoptionDto: UpdateAdoptionDto) {
    return this.adoptionsService.update(id, updateAdoptionDto);
  }
}
