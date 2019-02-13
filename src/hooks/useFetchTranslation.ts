/* eslint-disable no-console */
import ky from 'ky'
import { isEmpty } from 'lodash'
import localCache from 'lscache'
import { useEffect } from 'react'
import Article from '../types/Article'

export const useFetchTranslation = (
  word: string,
  setResults: (results: Article[]) => void,
  setLoading: (state: boolean) => void,
  setError: (error: string) => void,
): void => {
  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      if (isEmpty(word)) return

      const cached: Article[] | null = localCache.get(word)

      if (cached) {
        setResults(cached)
        return
      }

      setError('')

      try {
        const response = await ky(word, {
          method: 'get',
          signal: controller.signal,
          hooks: { beforeRequest: [() => setLoading(true)] },
          prefixUrl: process.env.REACT_APP_TRANSLATE_API,
        })

        // @see https://github.com/sindresorhus/ky/issues/96
        if (!response.ok) {
          const message = await response.text()
          throw new Error(message)
        }

        const body = await response.json()

        localCache.set(word, body, 60 * 24 * 7)
        setResults(body)
        setLoading(false)
      } catch (error) {
        if (error instanceof DOMException) {
          console.info('Request cancelled by the user.')
        } else {
          setError(error.message)
          setLoading(false)
        }
        setResults([])
      }
    })()
    return () => controller.abort()
  }, [word, setResults, setLoading])
}

export default useFetchTranslation
