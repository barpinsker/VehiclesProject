import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // הכתובת של Angular
    methods: 'GET,POST,PUT,DELETE', // המתודות שהשרת מקבל
    allowedHeaders: 'Content-Type, Authorization', // כותרות מורשות
  });
  await app.listen(3000,'0.0.0.0');
}
config();
bootstrap();
