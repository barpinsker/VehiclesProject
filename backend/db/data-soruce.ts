import { DataSource,DataSourceOptions } from 'typeorm';
 // אל תשכח לעדכן את הנתיב לישות שלך
import { user } from 'src/user/entities/user.entity';

export const dataSourceOptions :DataSourceOptions={
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'vehicleBD',
    entities: [user],
    migrations: ['src/migrations/*.ts'], // נתיב המיגרציות שלך
    synchronize: true, // אל תסנכרן אוטומטית
    logging:true

}
const dataSource=new DataSource(dataSourceOptions)
export default dataSource;