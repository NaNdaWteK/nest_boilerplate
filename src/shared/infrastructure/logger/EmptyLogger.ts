
import { ConsoleLogger, LoggerService } from '@nestjs/common';

export class EmptyLogger extends ConsoleLogger implements LoggerService {
  log(message: string, ...optionalParams: unknown[]) {
  }
  error(message: string, ...optionalParams: unknown[]) {
  }
  warn(message: string, ...optionalParams: unknown[]) {
  }
  debug(message: string, ...optionalParams: unknown[]) {
  }
  fatal(message: string, ...optionalParams: unknown[]) {
  }
}
