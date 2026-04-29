import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAdoptionDto {
  @ApiProperty()
  @IsString()
  catId: string;

  @ApiProperty()
  @IsString()
  adopterId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
