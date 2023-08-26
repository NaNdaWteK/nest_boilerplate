import { Controller, Get } from '@nestjs/common';
import Logger from '../shared/infrastructure/logger';
import { ConfigService } from '@nestjs/config';


@Controller('v1')
export class AppController {
  private readonly logger = new Logger()
  constructor(private readonly configService: ConfigService) {}
  getHealthzResponse() {
    return { status: 'ok' }
  }

  @Get('healthz')
  healthz(): { status: string } {
    this.logger.log('Healthz endpoint called', { port: this.configService.get('port') });
    return this.getHealthzResponse(); 
  }
}
