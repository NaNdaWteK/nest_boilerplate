import { ConfigFactory } from "@nestjs/config";
import * as dotenv from 'dotenv';
dotenv.config();
function die(what: Error | string): never {
  if (typeof what === 'string') {
    throw new Error(what);
  }
  throw what;
}
export default ()  => {
  const environment = process.env.NODE_ENV ?? die('NODE_ENV env is not defined')
  const config: {[key: string]: ConfigFactory} = {
    'development': () => ({
      'port': parseInt(process.env.PORT ?? die('PORT env is not defined')),
      'database': {
        'host': process.env.DATABASE_HOST ?? die('DATABASE_HOST env is not defined'),
        'port': parseInt(process.env.DATABASE_PORT ?? die('DATABASE_PORT env is not defined'))
      }
    })
  }
  return config[environment];
}
