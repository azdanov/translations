import { APIGatewayEvent, Handler } from 'aws-lambda'
import createError from 'http-errors'
import { isEmpty } from 'lodash'
import middy from 'middy'
import { handleErrors } from '../utils/handleErrors'
import { queryTranslation } from '../utils/queryTranslation'

export interface Response {
  statusCode: number
  body: string
}

const fetchTranslation: Handler = async (event: APIGatewayEvent): Promise<Response> => {
  const word = event.path.split('/').pop()

  if (!word) {
    throw new createError.BadRequest('Word not specified')
  }

  let translation
  try {
    translation = await queryTranslation(word)

    if (isEmpty(translation)) {
      throw new createError.NotFound()
    }
  } catch (error) {
    const { statusCode, statusMessage } = error
    const body = statusCode === 404 ? 'Translation not found' : statusMessage

    throw createError(statusCode, body)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(translation),
  }
}

export const handler = middy(fetchTranslation).use(handleErrors())
