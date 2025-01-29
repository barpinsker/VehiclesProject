import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleService } from './vehicle/vehicle.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleController } from './vehicle/vehicle.controller';
import { VehicleTable } from './vehicle/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppDataSource } from '../data-soruce';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from 'db/data-soruce';


@Module({
  imports: [VehicleModule ,TypeOrmModule.forRoot(dataSourceOptions),UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
