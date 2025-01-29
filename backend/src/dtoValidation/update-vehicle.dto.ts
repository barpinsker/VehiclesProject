import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class updateVehicleDto {
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsEnum(['active', 'inactive'])
  @IsOptional()
  status?: string;
}