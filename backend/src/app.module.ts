import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleService } from './vehicle/vehicle.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleController } from './vehicle/vehicle.controller';

@Module({
  imports: [VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
