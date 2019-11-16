import { Application } from 'express'
import asyncMiddleware from '../middleware/async-middleware'
import StaffController from '../controllers/staff.controller'
import multer, { memoryStorage } from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
})

class StaffRoute {
  private readonly _PRE_URL = '/api/staffs'
  private _staffController: StaffController = new StaffController()

  public init(app: Application) {
    app
      .route(`${this._PRE_URL}/upload-images`)
      .post(upload.array('images'), asyncMiddleware(this._staffController.uploadImages))
  }
}

export default StaffRoute
