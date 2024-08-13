import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/')
  app.enableCors()
  //app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen(3000);
}
bootstrap();
