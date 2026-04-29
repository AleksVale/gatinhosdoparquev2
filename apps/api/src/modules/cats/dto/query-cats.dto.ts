import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CatStatus, CatGender } from '@repo/database';

export class QueryCatsDto {
  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 100, default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({ enum: CatStatus })
  @IsOptional()
  @IsEnum(CatStatus)
  status?: CatStatus;

  @ApiPropertyOptional({ enum: CatGender })
  @IsOptional()
  @IsEnum(CatGender)
  gender?: CatGender;
}
