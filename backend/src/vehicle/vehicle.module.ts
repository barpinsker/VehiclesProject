import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from 'src/user/entities/user.entity';


@Module({
  imports:[TypeOrmModule.forFeature([user])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
