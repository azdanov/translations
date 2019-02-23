import { APIGatewayEvent, Handler } from 'aws-lambda'
import createError from 'http-errors'
import { isEmpty } from 'lodash'
import middy from 'middy'
import { EN, ET } from '../../constants'
import { ResponseContract } from '../contracts'
import { handleErrors, queryDefinition } from '../utils'

export const fetchDefinition: Handler = async (
  event: APIGatewayEvent,
): Promise<ResponseContract> => {
  const [word, lang] = event.path.split('/').reverse()

  if (!word) {
    throw new createError.BadRequest('Word not specified')
  }

  if (lang !== EN && lang !== ET) {
    throw new createError.BadRequest('Correct language not specified')
  }

  let definition
  try {
    definition = await queryDefinition(word, lang)

    if (isEmpty(definition)) {
      throw new createError.NotFound()
    }
  } catch (error) {
    const { statusCode, statusMessage } = error
    const body = statusCode === 404 ? 'Definition not found' : statusMessage

    throw createError(statusCode, body)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(definition),
  }
}

export const handler = middy(fetchDefinition).use(handleErrors())
