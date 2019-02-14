import { APIGatewayEvent, Handler } from 'aws-lambda'
import createError from 'http-errors'
import { isEmpty } from 'lodash'
import middy from 'middy'
import Response from '../contracts/ResponseContract'
import { handleErrors } from '../utils/handleErrors'
import { queryTranslation } from '../utils/queryTranslation'
import { ET, EN } from '../../i18n'

export const fetchTranslation: Handler = async (
  event: APIGatewayEvent,
): Promise<Response> => {
  const [word, lang] = event.path.split('/').reverse()

  if (!word) {
    throw new createError.BadRequest('Word not specified')
  }

  if (lang !== EN && lang !== ET) {
    throw new createError.BadRequest('Correct language not specified')
  }

  let translation
  try {
    translation = await queryTranslation(word, lang)

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
