import express, { Application } from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
// import MyPassport from './config/MyPassport'

import Route from './routes'

class App {
  private _app: Application
  private _route: Route = new Route()
  // private _myPassport: MyPassport = new MyPassport()

  constructor() {
    this._app = express()
    this.config()
    this._app.all('*', (req, res, next) => {
      if (req.path.includes('/api/auth')) return next()

      // return this._myPassport.authenticate(req, res, next)
    })
    this._route.init(this._app)
  }

  get app(): Application {
    return this._app
  }

  private config(): void {
    this._app.use(express.static(path.join(__dirname, 'public')))
    this._app.use(bodyParser.json())
    this._app.use(bodyParser.urlencoded({ extended: false }))
    this._app.use(cors())
  }
}

export default new App().app
