/* eslint-disable no-console */
import localCache from 'lscache'
import React, { useLayoutEffect } from 'react'
import { WordOfTheDayResult } from '../components/Main'
import { HALF_DAY, WORD_OF_THE_DAY_KEY } from '../constants'

export const useFetchWordOfTheDay = (
  setResult: React.Dispatch<React.SetStateAction<WordOfTheDayResult>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  useLayoutEffect(() => {
    const api = process.env.REACT_APP_WORDNIK_DAY_API

    if (!api) return

    const cached: WordOfTheDayResult | null = localCache.get(WORD_OF_THE_DAY_KEY)

    if (cached) {
      setResult(cached)
      return
    }

    ;(async () => {
      setLoading(true)
      try {
        const response = await fetch(api, {
          method: 'get',
        })

        if (!response.ok) {
          const message = await response.text()
          throw new Error(message)
        }

        const body = await response.json()

        localCache.set(WORD_OF_THE_DAY_KEY, body, HALF_DAY)
        setLoading(false)
        setResult(body)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    })()
  }, [setResult, setLoading])
}
