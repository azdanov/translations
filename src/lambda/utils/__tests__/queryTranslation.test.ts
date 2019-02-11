import { isEmpty, reject } from 'lodash'
import matchSorter from 'match-sorter'

const mockBody = [
  { en: 'cart', et: ['käru'] },
  { en: 'car', et: ['auto'] },
  { en: '', et: [] },
]

const mockWord = 'car'

beforeEach(() => {
  jest.resetModules()
})

test('should return results for proper json endpoint', async () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const { queryTranslation } = require('../queryTranslation')

  jest.mock('got', () =>
    jest.fn(() => ({
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(mockBody),
    })),
  )

  const results = await queryTranslation(mockWord)

  expect(results).toEqual(mockBody)
})

test('should return results for scraped endpoint', async () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const { queryTranslation } = require('../queryTranslation')

  jest.mock('got', () =>
    jest.fn(() => ({
      headers: { 'content-type': 'text/plain' },
      body: JSON.stringify(mockBody),
    })),
  )

  jest.mock('scrape-it', () => ({
    __esModule: true,
    default: { scrapeHTML: jest.fn(() => ({ articles: mockBody })) },
    namedExport: jest.fn(),
  }))

  const cleanResults = matchSorter(
    reject(mockBody, item => isEmpty(item.en) || isEmpty(item.et)),
    mockWord,
    { keys: ['en', 'et'] },
  )

  const results = await queryTranslation(mockWord)

  expect(results).toEqual(cleanResults)
})
