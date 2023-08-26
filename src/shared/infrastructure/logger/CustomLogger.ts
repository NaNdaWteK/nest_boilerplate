
import { ConsoleLogger, LoggerService } from '@nestjs/common';
import { stderr } from 'process';

export class CustomLogger extends ConsoleLogger implements LoggerService {
  log(message: string, ...optionalParams: unknown[]) {
    super.log(message, optionalParams);
  }
  error(message: string, ...optionalParams: unknown[]) {
    const output = `${JSON.stringify(optionalParams, null, 2)}\n`
    super.error(`${message}\n${output}\n`);
  }
  warn(message: string, ...optionalParams: unknown[]) {
    super.warn(message, optionalParams);
  }
  debug(message: string, ...optionalParams: unknown[]) {
    super.debug(message, optionalParams);
  }
  fatal(message: string, ...optionalParams: unknown[]) {
    super.fatal(`\x1b[35m${message}`, optionalParams);
  }
}
