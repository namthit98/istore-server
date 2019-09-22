import { Application } from 'express'
import AuthController from '../controllers/auth.controller'
import asyncMiddleware from '../middlewares/async-middleware'

class AuthRoute {
  private readonly _PRE_URL = '/api/auth'
  private _authController: AuthController = new AuthController()

  public init(app: Application) {
    app.route(`${this._PRE_URL}`).get(asyncMiddleware(this._authController.test))
  }
}

export default AuthRoute
