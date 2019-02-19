/* eslint-disable no-console */
import { isEmpty } from 'lodash'
import localCache from 'lscache'
import React, { useEffect } from 'react'
import { Article, Order } from '../types'

export const useFetchTranslation = (
  word: string,
  order: Order,
  setResults: React.Dispatch<React.SetStateAction<Article[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
): void => {
  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      if (isEmpty(word)) return

      word = setPrefix(order, word)

      const cached: Article[] | null = localCache.get(word)

      setError('')

      if (cached) {
        setResults(cached)
        return
      }

      setLoading(true)

      try {
        const response = await fetch(`${process.env.REACT_APP_TRANSLATE_API}/${word}`, {
          method: 'get',
          signal: controller.signal,
        })

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

function setPrefix(order: Order, word: string): string {
  if (order[0] === 'english') {
    word = `en/${word}`
  } else {
    word = `et/${word}`
  }

  return word
}
