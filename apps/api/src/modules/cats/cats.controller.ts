import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  Version,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { QueryCatsDto } from './dto/query-cats.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@repo/database';

@ApiTags('cats')
@Controller({ path: 'cats', version: '1' })
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'List all cats' })
  @ApiResponse({ status: 200, description: 'List of cats' })
  findAll(@Query() query: QueryCatsDto) {
    return this.catsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cat by ID' })
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VOLUNTEER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new cat (admin/volunteer only)' })
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VOLUNTEER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a cat (admin/volunteer only)' })
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a cat (admin only)' })
  remove(@Param('id') id: string) {
    return this.catsService.remove(id);
  }
}
