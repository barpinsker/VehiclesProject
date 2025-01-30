import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
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