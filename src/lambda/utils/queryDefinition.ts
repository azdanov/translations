/* eslint-disable unicorn/prefer-spread */
import got from 'got'
import createHttpError from 'http-errors'
import { capitalize, lowerCase } from 'lodash'
import pSettle from 'p-settle'
import scrapeIt from 'scrape-it'
import { CookieJar } from 'tough-cookie'
import { EN, ET } from '../../constants'
import { en, et } from '../../contracts'

export const queryDefinition = async (
  word: string,
  lang: en | et,
): Promise<string[]> => {
  word = lowerCase(word)

  if (
    !process.env.LAMBDA_DEFINITION_EN_API ||
    !process.env.LAMBDA_DEFINITION_ET_SIMPLE_API ||
    !process.env.LAMBDA_DEFINITION_ET_DETAILED_API
  )
    throw new createHttpError.InternalServerError('No ENV specified')

  if (lang !== EN && lang !== ET)
    throw new createHttpError.BadRequest('Correct language not specified')

  let definitions: string[] = []
  if (lang === EN) {
    const { body, $ } = await scrapeIt(
      process.env.LAMBDA_DEFINITION_EN_API.replace('%WORD$', word),
      {},
    )

    $(body)
      .find('.sp_definitions')
      .first()
      .find('div > .pull-right + div')
      .each((index: number, element: unknown) => {
        definitions.push($(element).text())
      })

    definitions = Array.from(
      new Set(
        definitions.map(d => {
          const removedBraces = d.match(
            /^(?:\(.*\)|\[.*] \(.*\)|\[.*] )?(.*)/,
          ) as RegExpMatchArray
          const trimmed = removedBraces[1].trim()
          const addedPeriod = trimmed.endsWith('.') ? trimmed : `${trimmed}.`
          return capitalize(addedPeriod)
        }),
      ),
    ).sort()
  }

  if (lang === ET) {
    const responses = await pSettle([
      got(process.env.LAMBDA_DEFINITION_ET_SIMPLE_API.replace('%WORD$', word), {
        cookieJar: new CookieJar(),
      }),
      got(process.env.LAMBDA_DEFINITION_ET_DETAILED_API.replace('%WORD$', word), {
        cookieJar: new CookieJar(),
      }),
    ])

    const [simple, detailed] = responses.map(res =>
      res.isFulfilled ? res.value && res.value.body : null,
    )

    const { definitionSimple } = scrapeIt.scrapeHTML(simple, {
      definitionSimple: '.homonym-intro',
    })

    const { definitionDetailed } = scrapeIt.scrapeHTML(detailed, {
      definitionDetailed: '.homonym-intro',
    })

    definitions = [definitionSimple, definitionDetailed]

    definitions = definitions.map(d => {
      const clean = d.replace(/\s\s+/g, ' ').trim()
      const addedPeriod = clean.endsWith('.') ? clean : `${clean}.`
      return capitalize(addedPeriod)
    })
  }

  return definitions
}
