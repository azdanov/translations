/* eslint-disable no-console */
import localCache from 'lscache'
import React, { useLayoutEffect } from 'react'
import { HALF_DAY, TOTAL_PHRASES_KEY } from '../constants'

export const useFetchStatistics = (
  setStatistics: React.Dispatch<
    React.SetStateAction<{
      phrases: string
    }>
  >,
): void => {
  useLayoutEffect(() => {
    const api = process.env.REACT_APP_WORDNIK_STATISTICS_API

    if (!api) return

    const cached: {
      phrases: string
    } | null = localCache.get(TOTAL_PHRASES_KEY)

    if (cached) {
      setStatistics(cached)
      return
    }

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

        localCache.set(TOTAL_PHRASES_KEY, body, HALF_DAY)
        setStatistics(body)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [setStatistics])
}
