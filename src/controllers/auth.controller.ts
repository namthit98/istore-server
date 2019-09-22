// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
// import AuthModel from '../models/auth.model'
// import { getSecret } from '../utils/helper'

class AuthController {
  public test = async (req: Request, res: Response) => {
    res.jsonp({
      message: 'Test Auth Route',
    })
  }
}

export default AuthController
