import ky from 'ky'
import localCache from 'lscache'
import { useLayoutEffect } from 'react'
import { WordOfTheDayResult } from '../components/WordOfTheDay'

const key = 'wordOfTheDay'

export const useFetchWordOfTheDay = (
  setResult: (results: WordOfTheDayResult) => void,
  setLoading: (state: boolean) => void,
): void => {
  useLayoutEffect(() => {
    const api = process.env.REACT_APP_WORDNIK_DAY_API

    if (!api) return

    const cached: WordOfTheDayResult | null = localCache.get(key)

    if (cached) {
      setResult(cached)
      return
    }

    ky(api, {
      method: 'get',
      hooks: { beforeRequest: [() => setLoading(true)] },
    })
      .then(res => res.json())
      .then((translation: WordOfTheDayResult) => {
        localCache.set(key, translation, 60 * 6)
        setResult(translation)
        setLoading(false)
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error)
        setLoading(false)
      })
  }, [setResult, setLoading])
}

export default useFetchWordOfTheDay
