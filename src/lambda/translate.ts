/* eslint-disable @typescript-eslint/camelcase */
import functionShield from '@middy/function-shield'
import { APIGatewayEvent, Handler } from 'aws-lambda'
import middy from 'middy'
import { httpErrorHandler, jsonBodyParser, validator } from 'middy/middlewares'
import { Article, queryTranslation } from '../utils/queryTranslation'

interface Response {
  statusCode: number
  body: string
}

const fetchTranslation: Handler = ({
  body,
}: APIGatewayEvent & { body: { word: string } }): Promise<Response> =>
  queryTranslation(body.word).then((translation: Article[]) => ({
    statusCode: 200,
    body: JSON.stringify(translation),
  }))

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

export const handler = middy(fetchTranslation)
  .use(
    // @ts-ignore
    functionShield({
      policy: {
        outbound_connectivity: 'block',
        read_write_tmp: 'block',
        create_child_process: 'block',
        read_handler: 'block',
      },
      token: process.env.LAMBDA_FUNCTION_SHIELD_TOKEN,
    }),
  )
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler())
