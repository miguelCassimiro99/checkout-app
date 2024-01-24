import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // using by default express | could be fastify for performance
}
bootstrap();

//? kebab-case => pattern used for Nest
