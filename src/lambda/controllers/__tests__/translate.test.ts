const mockBody = [{ en: 'car', et: ['auto'] }, { en: 'cart', et: ['käru'] }]

beforeEach(() => {
  jest.resetModules()
})

const handlerContext = jest.fn()
const handlerCallback = jest.fn()

test('should get an error when no word is specified', async () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const { fetchTranslation } = require('../translate')

  try {
    await fetchTranslation({ path: '' }, handlerContext, handlerCallback)
  } catch (error) {
    expect(error.message).toBe('Word not specified')
  }
})

test('should get an error when no translation is found', async () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const { fetchTranslation } = require('../translate')

  jest.mock('../../utils/queryTranslation.ts')

  try {
    await fetchTranslation(
      { path: 'localhost:3000/translate/en/car' },
      handlerContext,
      handlerCallback,
    )
  } catch (error) {
    expect(error.message).toBe('Translation not found')
  }
})

test('should get results', async () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const { fetchTranslation } = require('../translate')

  jest.mock('../../utils/queryTranslation.ts', () => ({
    __esModule: true,
    default: 'mockedDefaultExport',
    queryTranslation: jest.fn(() => mockBody),
  }))

  const results = await fetchTranslation(
    { path: 'localhost:3000/translate/en/car' },
    handlerContext,
    handlerCallback,
  )

  expect(JSON.parse(results.body)).toEqual(mockBody)
})
