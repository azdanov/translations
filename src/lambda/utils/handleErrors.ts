import { Handler } from 'aws-lambda'
import { HttpError } from 'http-errors'
import middy from 'middy'
import { Response } from '../controllers/translate'

export const handleErrors: middy.Middleware<
  null,
  Handler,
  Response
> = (): middy.MiddlewareObject<Handler, Response> => ({
  onError: (handler, next) => {
    if (handler.error instanceof HttpError) {
      handler.response = {
        statusCode: handler.error.statusCode,
        body: handler.error.message,
      }
      return next()
    }
    return next(handler.error)
  },
})
