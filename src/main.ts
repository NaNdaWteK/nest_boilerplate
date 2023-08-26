import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Logger from './shared/infrastructure/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = new Logger('Aplication Bootstrap')
  app.useLogger(logger);
  const port = parseInt(process.env.PORT || '');
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`, { port, env: process.env.NODE_ENV })
}
bootstrap();
