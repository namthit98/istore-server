import { Request, Response } from 'express'
import makeDir from 'make-dir'
import sharp from 'sharp'
import fs from 'fs'

class StaffController {
  public uploadImages = async (req: Request, res: Response) => {
    const image = (req.files as any)[0]
    if (!fs.existsSync('public/images/upload/staffs')) {
      await makeDir('public/images/upload/staffs')
    }
    sharp(image.buffer)
      .resize(600, 600)
      .toFile('public/images/upload/staffs/hello2.png')
      .then(info => {
        console.log(info)
      })
      .catch(e => {
        console.log(e)
      })
    res.jsonp({ message: 'hello' })
  }
}

export default StaffController
