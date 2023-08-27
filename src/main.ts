import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Logger from './shared/infrastructure/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.use(helmet());
  
  const config = new DocumentBuilder()
    .setTitle('Api Docs')
    .setDescription('Api documentation')
    .setVersion('1.0')
    .addTag('Api Docs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const logger = new Logger('Aplication Bootstrap')
  app.useLogger(logger);

  const port = parseInt(process.env.PORT || '');
  await app.listen(port);

  logger.log(`Application is running on: ${await app.getUrl()}`, { port, env: process.env.NODE_ENV })
}
bootstrap();
