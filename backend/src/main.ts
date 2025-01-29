import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Vehicle Example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('Functions')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors({
    origin: 'http://localhost:4200', // הכתובת של Angular
    methods: 'GET,POST,PUT,DELETE', // המתודות שהשרת מקבל
    allowedHeaders: 'Content-Type, Authorization', // כותרות מורשות
  });
  await app.listen(3000,'0.0.0.0');
}
bootstrap();
