import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/')
  app.enableCors()
  //app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen(3000);
  console.log('Server listening on port 3000')
}
bootstrap();
