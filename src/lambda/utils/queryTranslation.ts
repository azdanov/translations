import got from 'got'
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
  const api = `${process.env.LAMBDA_TRANSLATION_API}/${word +
    process.env.LAMBDA_TRANSLATION_API_PARAMS}`

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
