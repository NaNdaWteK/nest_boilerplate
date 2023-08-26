import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './shared/infrastructure/logger/CustomLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = new CustomLogger()
  app.useLogger(logger);
  const port = parseInt(process.env.PORT || '');
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`, { port, env: process.env.NODE_ENV })
}
bootstrap();
