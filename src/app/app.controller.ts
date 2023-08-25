import { Controller, Get } from '@nestjs/common';


@Controller('v1')
export class AppController {
  constructor() {}
  getHealthzResponse() {
    return { status: 'ok' }
  }

  @Get('healthz')
  healthz(): { status: string } {
    return this.getHealthzResponse(); 
  }
}
