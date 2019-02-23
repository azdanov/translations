import localCache from 'lscache'
import React, { SetStateAction, useLayoutEffect } from 'react'
import { DEFINITION_KEY, WEEK } from '../constants'

export const useDefinition = (
  lang: string,
  word: string,
  setDefinitions: React.Dispatch<SetStateAction<string[]>>,
  setError: React.Dispatch<SetStateAction<string>>,
): void => {
  useLayoutEffect(() => {
    const api = `${process.env.REACT_APP_DEFINITION_API}/${lang}/${word}`
    if (!api) return

    const key = `${DEFINITION_KEY}:${lang}:${word}`

    const cached: string[] | null = localCache.get(key)

    if (cached) {
      setDefinitions(cached)
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

        localCache.set(key, body, WEEK)
        setDefinitions(body)
      } catch (error) {
        console.error(error)
        setError('no definitions')
      }
    })()
  }, [lang, word, setDefinitions, setError])
}
