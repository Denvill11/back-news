import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [process.env.REACT_APP_URL],
  });
  await app.listen(PORT);
}
bootstrap();
