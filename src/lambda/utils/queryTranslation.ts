import got from 'got'
import createHttpError from 'http-errors'
import { isEmpty, reject } from 'lodash'
import matchSorter from 'match-sorter'
import scrapeIt from 'scrape-it'
import { Article } from '../../types/Article'

interface Translation {
  articles: Articles
}

interface Articles {
  [key: string]: Article
}

export const queryTranslation = async (word: string): Promise<Article[]> => {
  if (!process.env.LAMBDA_TRANSLATE_API)
    throw new createHttpError.InternalServerError('No ENV specified')

  const api = process.env.LAMBDA_TRANSLATE_API.replace('%WORD%', word)

  const response = await got(api)
  const contentType = response.headers['content-type']

  if (contentType && contentType.includes('application/json')) {
    return JSON.parse(response.body)
  }

  const { articles } = scrapeIt.scrapeHTML<Translation>(response.body, {
    articles: {
      listItem: '.tervikart',
      data: {
        en: '.m',
        et: {
          listItem: '.x',
        },
      },
    },
  })

  const translation = reject(articles, item => isEmpty(item.en) || isEmpty(item.et))

  return matchSorter(translation, word, { keys: ['en', 'et'] })
}
