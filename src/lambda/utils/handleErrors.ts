import { Handler } from 'aws-lambda'
import { HttpError } from 'http-errors'
import middy from 'middy'
import { ResponseContract } from '../contracts'

export const handleErrors: middy.Middleware<
  null,
  Handler,
  ResponseContract
> = (): middy.MiddlewareObject<Handler, ResponseContract> => ({
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
