import { Controller, Get } from '@nestjs/common';
import Logger from '../shared/infrastructure/logger';
import { ConfigService } from '@nestjs/config';
import { ApiResponse } from '@nestjs/swagger';
import { HealthzResponseDTO } from './domain/dtos/HealthzResponseDTO.entity';


@Controller('v1')
export class AppController {
  private readonly logger = new Logger()
  constructor(private readonly configService: ConfigService) {}
  getHealthzResponse(): HealthzResponseDTO {
    return { status: 'ok' }
  }

  @Get('healthz')
  @ApiResponse({
    status: 200, 
    description: 'Healthz endpoint',
    type: HealthzResponseDTO
  })
  healthz(): HealthzResponseDTO {
    this.logger.log('Healthz endpoint called', { port: this.configService.get('port') });
    return this.getHealthzResponse(); 
  }
}
