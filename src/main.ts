import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // grep the object from the request and transform -> intercept before it comes to the conrtoller

  await app.listen(3001); // using by default express | could be fastify for performance
}
bootstrap();

//? kebab-case => pattern used for Nest
