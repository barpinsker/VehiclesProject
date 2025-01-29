import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    id: number;
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