import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { VehicleTable } from './vehicle/vehicle.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres', // Database username
password: '1234', // Database password
database: 'vehicleBD', //Name DB
entities: [__dirname + '/**/*.entity{.ts,.js}'], //Path to entities
migrations: [__dirname + '/**/*.migrations{.ts,.js}'], // Path to migrations
synchronize: false, // Turn off auto-sync (use migrations instead)

}