import { DataSource } from 'typeorm';
import { Vehicle } from './vehicle.entity';


export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "vehicleBD",
  entities: [Vehicle],
  migrations: ["src/db/migrations/*.ts"],
  synchronize: true,
  logging: true
});
