import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}
  async ping() {
    const adminUtil = this.connection.db.admin()
    const mongoPing = await adminUtil.ping()
    return {
      status: 'OK.',
      mongoPing
    }
  }

  getMongoConnection() {
    return this.connection
  }
}
