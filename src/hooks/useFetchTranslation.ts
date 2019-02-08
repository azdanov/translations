import ky from 'ky'
import { isEmpty, noop } from 'lodash'
import { useEffect } from 'react'
import { Result } from '../components/App'

export const useFetchTranslation = (
  term: string,
  setResults: (results: Result[]) => void,
  setLoading: (state: boolean) => void,
): void => {
  useEffect(() => {
    if (isEmpty(term)) return noop

    const controller = new AbortController()

    ky(term, {
      signal: controller.signal,
      hooks: { beforeRequest: [() => setLoading(true)] },
      prefixUrl: process.env.REACT_APP_API,
    })
      .then(res => res.json())
      .then(data => {
        setResults(data)
        setLoading(false)
      })
      .catch(error => {
        if (error instanceof DOMException) {
          // eslint-disable-next-line no-console
          console.info('Request cancelled by the user.')
          setResults([] as Result[])
        } else {
          // eslint-disable-next-line no-console
          console.error('Unexpected:', error)
          setLoading(false)
        }
      })

    return (): void => controller.abort()
  }, [term, setResults, setLoading])
}
