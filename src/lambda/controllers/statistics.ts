import { Handler } from 'aws-lambda'
import middy from 'middy'
import scrapeIt from 'scrape-it'
import createError from 'http-errors'
import { ResponseContract } from '../contracts'
import { handleErrors } from '../utils'

export const fetchStatistics: Handler = async (): Promise<ResponseContract> => {
  if (!process.env.LAMBDA_WORDNIK_STATISTICS_API)
    throw new createError.InternalServerError('No env specified')

  const { $, body } = await scrapeIt(process.env.LAMBDA_WORDNIK_STATISTICS_API, {
    article: '.dictionaryWelcomePage article',
  })

  const phrases = $(body)
    .find('h2:contains("Statistics")')
    .next()
    .text()
    .match(/\d+,\d+/)
    .shift()

  return {
    body: JSON.stringify({ phrases }),
    statusCode: 200,
  }
}

export const handler = middy(fetchStatistics).use(handleErrors())
