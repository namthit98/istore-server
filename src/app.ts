import express, { Application } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from './config'
// import MyPassport from './config/MyPassport'

import Route from './routes'
import logger from './utils/logger'

class App {
  private readonly _MONGO_URI: string = config.db.uri
  private readonly _DATABASE: string = config.db.database
  private readonly _MONGO_OPTIONS: object = config.db.options
  private _app: Application = express()
  private _route: Route = new Route()
  // private _myPassport: MyPassport = new MyPassport()

  constructor() {
    this.connectDatabase()
    this.config()
    // this._app.all('*', (req, res, next) => {
    //   if (req.path.includes('/api/auth')) return next()

    //   // return this._myPassport.authenticate(req, res, next)
    // })
    this._route.init(this._app)
  }

  get app(): Application {
    return this._app
  }

  private config(): void {
    this._app.use(express.static(path.join(__dirname, '..', 'public')))
    this._app.use(bodyParser.json())
    this._app.use(bodyParser.urlencoded({ extended: false }))
    this._app.use(cors())
  }

  private connectDatabase(): void {
    mongoose.connect(`${this._MONGO_URI}/${this._DATABASE}`, this._MONGO_OPTIONS)
    mongoose.connection.once('open', () => {
      logger.debug('Connected to Mongo via Mongoose')
    })
    mongoose.connection.on('error', err => {
      logger.error('Unable to connect to Mongo via Mongoose', err)
    })
  }
}

export default new App().app
