import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AdoptionStatus } from '../../../../domain/adoptions/adoption.types';

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
