import { Controller, Get } from '@nestjs/common';
import { CustomLogger } from '../shared/infrastructure/logger/CustomLogger';
import { ConfigService } from '@nestjs/config';


@Controller('v1')
export class AppController {
  constructor(private logger: CustomLogger, private readonly configService: ConfigService) {}
  getHealthzResponse() {
    return { status: 'ok' }
  }

  @Get('healthz')
  healthz(): { status: string } {
    this.logger.log('Healthz endpoint called', { port: this.configService.get('port') });
    return this.getHealthzResponse(); 
  }
}
