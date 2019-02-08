import { APIGatewayEvent, Handler } from 'aws-lambda'
import middy from 'middy'
import { httpErrorHandler } from 'middy/middlewares'
import { queryTranslation } from '../utils/queryTranslation'

interface Response {
  statusCode: number
  body: string
}

const fetchTranslation: Handler = async (
  event: APIGatewayEvent,
): Promise<Response | null> => {
  const word = event.path.split('/').pop()

  if (!word) return null

  const translation = await queryTranslation(word)

  return {
    statusCode: 200,
    body: JSON.stringify(translation),
  }
}

export const handler = middy(fetchTranslation).use(httpErrorHandler())
