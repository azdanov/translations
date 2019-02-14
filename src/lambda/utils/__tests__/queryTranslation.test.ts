import mockFixture from '../../../fixtures/data.json'
import { EN } from '../../../i18n'

const mockBody = [{ en: 'car', et: ['vagun', 'auto', 'gondel', 'sõiduauto'] }]

const mockWord = 'car'

beforeEach(() => {
  jest.resetModules()
})

test('should return results only for json', async () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const { queryTranslation } = require('../queryTranslation')

  jest.mock('got', () =>
    jest.fn(() => ({
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(mockFixture.car),
    })),
  )

  const results = await queryTranslation(mockWord, EN)

  expect(results).toEqual(mockBody)
})

test('should return results for scraped and json', async () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const { queryTranslation } = require('../queryTranslation')

  jest.mock('got', () =>
    jest
      .fn()
      .mockResolvedValueOnce({
        headers: { 'content-type': 'text/json' },
        body: JSON.stringify(mockFixture.car),
      })
      .mockResolvedValueOnce({
        headers: { 'content-type': 'text/plain' },
        body: '<html></html>',
      }),
  )

  jest.mock('scrape-it', () => ({
    __esModule: true,
    default: { scrapeHTML: jest.fn(() => ({ articles: mockBody })) },
    namedExport: jest.fn(),
  }))

  const results = await queryTranslation(mockWord, EN)

  expect(results).toEqual(mockBody.concat(mockBody))
})
