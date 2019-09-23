import { Request, Response, NextFunction, Application } from 'express'

import logger from '../utils/logger'
import config from '../config'
import TodoRoute from './todo.route'

class Route {
  private _todoRoute: TodoRoute = new TodoRoute()

  public init(app: Application) {
    this._todoRoute.init(app)

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
