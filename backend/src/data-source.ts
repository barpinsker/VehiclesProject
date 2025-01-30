import { DataSource } from 'typeorm';
import { Vehicle } from './vehicle.entity';


export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'db',  // החיבור לקונטיינר של ה-DB
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'postgres',
  entities: [Vehicle],
  migrations: ["dist/db/migrations/*.js"],
  synchronize: true,
  logging: true
});
