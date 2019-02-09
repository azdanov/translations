import ky from 'ky'
import { isEmpty, noop } from 'lodash'
import { useEffect } from 'react'
import { Article } from '../types/Article'

export const useFetchTranslation = (
  word: string,
  setResults: (results: Article[]) => void,
  setLoading: (state: boolean) => void,
): void => {
  useEffect(() => {
    if (isEmpty(word)) return noop

    const controller = new AbortController()

    ky(word, {
      method: 'get',
      signal: controller.signal,
      hooks: { beforeRequest: [() => setLoading(true)] },
      prefixUrl: process.env.REACT_APP_API,
    })
      .then(res => res.json())
      .then((translation: Article[]) => {
        setResults(translation)
        setLoading(false)
      })
      .catch(error => {
        if (error instanceof DOMException) {
          // eslint-disable-next-line no-console
          console.info('Request cancelled by the user.')
          setResults([])
        } else {
          // eslint-disable-next-line no-console
          console.error('Unexpected:', error)
          setLoading(false)
        }
      })

    return (): void => controller.abort()
  }, [word, setResults, setLoading])
}
