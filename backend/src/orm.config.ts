import { DataSource } from 'typeorm';
import * as path from 'path'; // הוסף את השורה הזו
import { VehicleTable } from './vehicle/vehicle.entity';
// import { VehicleTable } from 'vehicle', 'vehicle.entity');

export const AppDataSource = new DataSource({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres', // Database username
     password: '1234', // Database password
     database: 'vehicleBD', //Name DB
     entities: [VehicleTable], //Path to entities
     migrations: ['src/migrations/*.ts'],  // Path to migrations
     synchronize: false, // Turn off auto-sync (use migrations instead)
     
});
// // "typeorm:cli": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli -f ./ormconfig-migrations.ts",
    // "migration-generate": "npm run typeorm:cli -- migration:generate -n",
//     "migration:generate": "npm run typeorm:cli -- migration:generate -d src/database/migrations -n",