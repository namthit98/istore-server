import app from './app'
import config from './config'
import logger from './utils/logger'

class Server {
  private readonly _PORT: number = config.port
  private readonly _ENV: string = config.env

  constructor() {
    app.listen(this._PORT, () => {
      logger.debug(`ENV: ${this._ENV}`)
      logger.debug('Express server listening on port ' + this._PORT)
    })
  }
}

new Server()
