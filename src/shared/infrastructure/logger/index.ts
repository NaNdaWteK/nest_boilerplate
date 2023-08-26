import { CustomLogger } from "./CustomLogger";
import { EmptyLogger } from "./EmptyLogger";

const logger = process.env.NODE_ENV !== 'testing' ? 
  CustomLogger : 
  EmptyLogger

export default logger;