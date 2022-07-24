import { NestFactory } from '@nestjs/core';
import { AppModule } from './appModule/app.module';
import { BookModule } from './books/books.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
