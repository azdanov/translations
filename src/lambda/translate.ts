/* eslint-disable @typescript-eslint/camelcase */
import { APIGatewayEvent, Handler } from 'aws-lambda'
import createError from 'http-errors'
import middy from 'middy'
import { httpErrorHandler, jsonBodyParser, validator } from 'middy/middlewares'
import { Article, queryTranslation } from '../utils/queryTranslation'

interface Response {
  statusCode: number
  body: string
}

const fetchTranslation: Handler = (
  event: APIGatewayEvent & { body: { word: string } },
): Promise<Response> => {
  console.log(event.headers.origin)
  return queryTranslation(event.body.word).then((translation: Article[]) => ({
    statusCode: 200,
    body: JSON.stringify(translation),
  }))
}

const inputSchema = {
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['word'],
      properties: {
        word: {
          type: 'string',
          minLength: 1,
          maxLength: 45,
        },
      },
    },
  },
}

export const handle = middy(fetchTranslation)
  .before((handler, next) => {
    const { origin } = handler.event.headers

    if (origin !== process.env.REACT_APP_NETLIFY_URL) {
      const error = new createError.Forbidden('Access Denied')
      // eslint-disable-next-line lodash/prefer-lodash-method
      handler.event.headers = Object.assign({}, handler.event.headers)
      throw error
    }

    next()
  })
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler())
