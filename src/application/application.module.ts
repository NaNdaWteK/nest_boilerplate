import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from '../shared/infrastructure/logger/logger.module';

@Module({
  imports: [
    LoggerModule,
  ],
  controllers: [AppController],
})
export class ApplicationModule {}
