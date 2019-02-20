/* eslint-disable lodash/chaining */
import got from 'got'
import createHttpError from 'http-errors'
import { flattenDeep, groupBy, isEmpty, isObject, map, mapValues, reject } from 'lodash'
import matchSort from 'match-sorter'
import scrapeIt from 'scrape-it'
import { EN, ET } from '../../constants'
import { Article, en, et, JsonBody, Translation } from '../../contracts'

export const queryTranslation = async (
  word: string,
  lang: en | et,
): Promise<Article[]> => {
  const { api, similar } = pickApis(lang, word)

  const [translationResponse, similarResponse] = await Promise.all([
    got(api),
    got(similar),
  ])

  return parseResponse(translationResponse, similarResponse, word)
}

function pickApis(lang: en | et, word: string): { api: string; similar: string } {
  if (
    !process.env.LAMBDA_TRANSLATE_EN_API ||
    !process.env.LAMBDA_TRANSLATE_ET_API ||
    !process.env.LAMBDA_SIMILAR_ET_API ||
    !process.env.LAMBDA_SIMILAR_EN_API
  )
    throw new createHttpError.InternalServerError('No ENV specified')

  if (lang !== EN && lang !== ET)
    throw new createHttpError.BadRequest('Correct language not specified')

  let api
  let similar

  if (lang === EN) {
    api = process.env.LAMBDA_TRANSLATE_EN_API.replace('%WORD%', word)
    similar = process.env.LAMBDA_SIMILAR_EN_API.replace('%WORD%', word)
  } else {
    api = process.env.LAMBDA_TRANSLATE_ET_API.replace('%WORD%', word)
    similar = process.env.LAMBDA_SIMILAR_ET_API.replace('%WORD%', word)
  }

  return { api, similar }
}

function parseResponse(
  translationResponse: got.Response<string>,
  similarResponse: got.Response<string>,
  word: string,
): Article[] {
  let translation: Article[] = []

  const body = JSON.parse(translationResponse.body) as JsonBody

  if (body.from === EN) {
    const results = [
      {
        en: body.phrase,
        et: reject(map(body.tuc, item => item.phrase && item.phrase.text), isEmpty),
      },
    ]

    translation = reject(results, item => isEmpty(item.en) || isEmpty(item.et))

    const { articles } = scrapeIt.scrapeHTML<Translation>(similarResponse.body, {
      articles: {
        listItem: '#simmilarPhrasesTable .tableRow',
        data: {
          en: 'dt',
          et: {
            listItem: 'dd',
          },
        },
      },
    })

    translation = translation.concat(
      reject(
        articles,
        item => isEmpty(item.en) || isEmpty(item.et) || isObject(item.et[0]),
      ),
    )

    translation = dedupe(translation, 'en', 'et')
    translation = matchSort(translation, word, {
      keys: ['en', 'et'],
    })
  }

  if (body.from === ET) {
    const results = [
      {
        et: body.phrase,
        en: reject(map(body.tuc, item => item.phrase && item.phrase.text), isEmpty),
      },
    ]

    translation = reject(results, item => isEmpty(item.et) || isEmpty(item.en))

    const { articles } = scrapeIt.scrapeHTML<Translation>(similarResponse.body, {
      articles: {
        listItem: '#simmilarPhrasesTable .tableRow',
        data: {
          et: 'dt',
          en: {
            listItem: 'dd',
          },
        },
      },
    })

    translation = translation.concat(
      reject(
        articles,
        item => isEmpty(item.en) || isEmpty(item.et) || isObject(item.et[0]),
      ),
    )

    translation = dedupe(translation, 'et', 'en')
    translation = matchSort(translation, word, {
      keys: ['et', 'en'],
    })
  }

  return translation
}

const dedupe = (translations: Article[], key: string, value: string): Article[] => {
  return map(
    mapValues(groupBy(translations, key), v => flattenDeep(map(v, value))),
    (v, k) => ({ en: k, et: v }),
  )
}
