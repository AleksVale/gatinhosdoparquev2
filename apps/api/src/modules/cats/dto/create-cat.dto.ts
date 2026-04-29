import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { CatStatus, CatGender } from '@repo/database';

export class CreateCatDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ minimum: 0 })
  @IsNumber()
  @Min(0)
  age: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  breed?: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ enum: CatStatus })
  @IsOptional()
  @IsEnum(CatStatus)
  status?: CatStatus;

  @ApiProperty({ enum: CatGender })
  @IsEnum(CatGender)
  gender: CatGender;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isVaccinated?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isNeutered?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight?: number;
}
