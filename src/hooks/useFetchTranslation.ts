import { useEffect } from 'react'
import { isEmpty, noop } from 'lodash'
import ky from 'ky'
import { Result } from '../components/App'

export const useFetchTranslation = (
  search: string,
  setResults: (results: Result[]) => void,
  setLoading: (state: boolean) => void,
): void => {
  useEffect(() => {
    if (isEmpty(search)) return noop

    const controller = new AbortController()

    ky('', {
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
  }, [search, setResults, setLoading])
}
