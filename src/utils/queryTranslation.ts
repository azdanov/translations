import { isEmpty, reject } from 'lodash'
import matchSorter from 'match-sorter'
import scrapeIt from 'scrape-it'

interface Translation {
  articles: Articles
}

interface Articles {
  [key: string]: Article
}

export interface Article {
  en: string
  et: string[]
}

export const queryTranslation = (word: string): Promise<Article[]> => {
  return scrapeIt<Translation>(
    `${process.env.LAMBDA_TRANSLATION_API}?Q=${word}&F=A&C06=en`,
    {
      articles: {
        listItem: '.tervikart',
        data: {
          en: '.m',
          et: {
            listItem: '.x',
          },
        },
      },
    },
  )
    .then(({ data }) => {
      const { articles } = data
      return reject(articles, item => isEmpty(item.en) || isEmpty(item.et))
    })
    .then(translation => matchSorter(translation, word, { keys: ['en', 'et'] }))
}
