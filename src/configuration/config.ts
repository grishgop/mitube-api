import { AppConfiguration } from './model'

export default (): AppConfiguration => ({
  port: parseInt(process.env.SERVICE_PORT || '4000'),
  logLevel: process.env.LOG_LEVEL || 'info',
  mongoUrl: process.env.MONGO_URL || '',
  mongoDatabaseName: process.env.MONGO_DB_NAME || '',
  startApiDocs: process.env.START_API_DOCS || 'false',
  youtubeApiBaseUrl: process.env.YT_API_URL || '',
  youtubeApiKey: process.env.YT_API_KEY || ''
})
