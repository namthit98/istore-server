import { createLogger, format, transports } from 'winston'
import { TransformableInfo } from 'logform'

const { combine, timestamp, printf } = format

const loggerFormat = printf((info: TransformableInfo) => {
  return `${info.timestamp} | ${info.level}: ${JSON.stringify(info.message)}`
})

const logger = createLogger({
  level: 'debug',
  format: combine(format.colorize(), timestamp(), loggerFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' }),
    new transports.File({ filename: 'error.log', level: 'error' }),
  ],
})

export default logger
