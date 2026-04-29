import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AdoptionStatus } from '@repo/database';

export class UpdateAdoptionDto {
  @ApiPropertyOptional({ enum: AdoptionStatus })
  @IsOptional()
  @IsEnum(AdoptionStatus)
  status?: AdoptionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
