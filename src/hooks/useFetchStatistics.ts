/* eslint-disable no-console */
import localCache from 'lscache'
import React, { useEffect } from 'react'

const key = 'totalPhrases'

export const useFetchStatistics = (
  setStatistics: React.Dispatch<
    React.SetStateAction<{
      phrases: string
    }>
  >,
): void => {
  useEffect(() => {
    const api = process.env.REACT_APP_WORDNIK_STATISTICS_API

    if (!api) return

    const cached: {
      phrases: string
    } | null = localCache.get(key)

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

        localCache.set(key, body, 60 * 6)
        setStatistics(body)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [setStatistics])
}
