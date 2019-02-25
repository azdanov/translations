/* eslint-disable lodash/chaining */
import got from 'got'
import createHttpError from 'http-errors'
import {
  flatMap,
  flattenDeep,
  groupBy,
  isEmpty,
  isObject,
  map,
  mapValues,
  reject,
  split,
  trim,
  uniq,
  lowerCase,
} from 'lodash'
import matchSort from 'match-sorter'
import scrapeIt from 'scrape-it'
import { EN, ET, WORD_REPLACE_KEY } from '../../constants'
import { Article, en, et, Translation } from '../../contracts'

export const queryTranslation = async (
  word: string,
  lang: en | et,
): Promise<Article[]> => {
  word = lowerCase(word)

  const { api } = pickApis(lang, word)
  const translationResponse = await got(api)

  return parseResponse(translationResponse, word, lang)
}

function pickApis(lang: en | et, word: string): { api: string } {
  if (!process.env.LAMBDA_TRANSLATE_EN_API || !process.env.LAMBDA_TRANSLATE_ET_API)
    throw new createHttpError.InternalServerError('No ENV specified')

  if (lang !== EN && lang !== ET)
    throw new createHttpError.BadRequest('Correct language not specified')

  let api

  if (lang === EN) {
    api = process.env.LAMBDA_TRANSLATE_EN_API.replace(WORD_REPLACE_KEY, word)
  } else {
    api = process.env.LAMBDA_TRANSLATE_ET_API.replace(WORD_REPLACE_KEY, word)
  }

  return { api }
}

function parseResponse(
  translationResponse: got.Response<string>,
  word: string,
  lang: en | et,
): Article[] {
  let translation: Article[] = []

  if (lang === EN) {
    const { translations } = scrapeIt.scrapeHTML<{ translations: { item: string }[] }>(
      translationResponse.body,
      {
        translations: {
          listItem: '.phraseMeaning .text-info',
          data: {
            item: '.phr',
          },
        },
      },
    )

    const results = [
      {
        en: word,
        et: reject(map(translations, 'item'), isEmpty),
      },
    ]

    translation = reject(results, item => isEmpty(item.en) || isEmpty(item.et))

    const { articles } = scrapeIt.scrapeHTML<Translation>(translationResponse.body, {
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

    translation = splitAndDedupe(translation, 'en', 'et') as Article[]
    translation = matchSort(translation, word, {
      keys: ['en', 'et'],
    })
  }

  if (lang === ET) {
    const { translations } = scrapeIt.scrapeHTML<{ translations: { item: string }[] }>(
      translationResponse.body,
      {
        translations: {
          listItem: '.phraseMeaning .text-info',
          data: {
            item: '.phr',
          },
        },
      },
    )

    const results = [
      {
        et: word,
        en: reject(map(translations, 'item'), isEmpty),
      },
    ]

    translation = reject(results, item => isEmpty(item.et) || isEmpty(item.en))

    const { articles } = scrapeIt.scrapeHTML<Translation>(translationResponse.body, {
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

    translation = splitAndDedupe(translation, 'et', 'en') as Article[]
    translation = matchSort(translation, word, {
      keys: ['et', 'en'],
    })
  }

  return translation
}

const splitAndDedupe = (
  translations: Article[],
  key: string,
  value: string,
): unknown[] => {
  return map(
    mapValues(groupBy(translations, key), v => flattenDeep(map(v, value))),
    (v, k) => ({
      [key]: k.toLowerCase(),
      [value]: uniq(flatMap(v, item => map(split(item.toLowerCase(), ','), trim))),
    }),
  )
}
