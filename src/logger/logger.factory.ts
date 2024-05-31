import { format, transports } from 'winston'
import { ConfigService } from '@nestjs/config'

export function getLogFormat() {
  return format.combine(
    format.timestamp(),
    format.printf(
      /*istanbul ignore next */
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    ),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
    format.json()
  )
}

export async function loggerFactory(config: ConfigService) {
  return {
    level: config.getOrThrow<string>('logLevel'),
    format: getLogFormat(),
    transports: [new transports.Console()]
  }
}
