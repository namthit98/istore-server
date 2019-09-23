import { Request, Response, NextFunction } from 'express'
import { Schema, ValidationErrorItem } from '@hapi/joi'
import logger from '../utils/logger'

interface ISchema {
  [key: string]: Schema
}

export default function({ body: bodySchema, params: paramsSchema, query: querySchema }: ISchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { body, query, params } = req

    if (body && bodySchema) {
      const { error } = bodySchema.validate(body)
      if (error) {
        const errorText: string = error.details.reduce(
          (result: string, curr: ValidationErrorItem) => {
            return (result += curr.message)
          },
          ''
        )

        logger.error(error.details)
        return res.status(400).jsonp(errorText)
      }
    }

    if (query && querySchema) {
      const { error } = querySchema.validate(query)
      if (error) {
        const errorText: string = error.details.reduce(
          (result: string, curr: ValidationErrorItem) => {
            return (result += curr.message)
          },
          ''
        )

        logger.error(error.details)
        return res.status(400).jsonp(errorText)
      }
    }

    if (params && paramsSchema) {
      const { error } = paramsSchema.validate(params)
      if (error) {
        const errorText: string = error.details.reduce(
          (result: string, curr: ValidationErrorItem) => {
            return (result += curr.message)
          },
          ''
        )

        logger.error(error.details)
        return res.status(400).jsonp(errorText)
      }
    }

    next()
  }
}
