/* eslint-disable no-console */
import localCache from 'lscache'
import React, { useLayoutEffect } from 'react'
import { WordOfTheDayResult } from '../components'

const key = 'wordOfTheDay'

export const useFetchWordOfTheDay = (
  setResult: React.Dispatch<React.SetStateAction<WordOfTheDayResult>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  useLayoutEffect(() => {
    const api = process.env.REACT_APP_WORDNIK_DAY_API

    if (!api) return

    const cached: WordOfTheDayResult | null = localCache.get(key)

    if (cached) {
      setResult(cached)
      return
    }

    setLoading(true)
    ;(async () => {
      try {
        const response = await fetch(api, {
          method: 'get',
        })

        if (!response.ok) {
          const message = await response.text()
          throw new Error(message)
        }

        const body = await response.json()

        localCache.set(key, body, 60 * 6)
        setResult(body)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    })()
  }, [setResult, setLoading])
}
