import { Handler } from 'aws-lambda'
import got from 'got'
import createError from 'http-errors'
import middy from 'middy'
import Response from '../contracts/ResponseContract'
import { handleErrors } from '../utils/handleErrors'

export const fetchWordOfTheDay: Handler = async (): Promise<Response> => {
  if (!process.env.LAMBDA_WORDNIK_DAY_API)
    throw new createError.InternalServerError('No env specified')

  const { body } = await got(process.env.LAMBDA_WORDNIK_DAY_API)

  return {
    body,
    statusCode: 200,
  }
}

export const handler = middy(fetchWordOfTheDay).use(handleErrors())
