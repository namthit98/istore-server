import { Request, Response, NextFunction, Application } from 'express'

import logger from '../utils/logger'
import config from '../config'
import AuthRoute from './auth.route'

class Route {
  private _authRoute: AuthRoute = new AuthRoute()

  public init(app: Application) {
    this._authRoute.init(app)

    this.handleErrorRoute(app)
  }

  private handleErrorRoute(app: Application) {
    // eslint-disable-next-line
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      logger.error(err.stack)

      return res.status(500).jsonp({
        message: config.env === 'development' ? err.stack : 'Có lỗi xảy ra từ server',
      })
    })
  }
}

export default Route