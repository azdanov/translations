/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import { isString, isObject, noop } from 'lodash'

// @see https://github.com/streamich/react-use/blob/master/src/useLocalStorage.ts
export const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  raw?: boolean,
): [T, (value: T) => void] => {
  if (!isObject(window)) {
    return [initialValue as T, noop]
  }

  const [state, setState] = useState<T>(() => {
    try {
      const localStorageValue = localStorage.getItem(key)
      if (!isString(localStorageValue)) {
        localStorage.setItem(
          key,
          raw ? String(initialValue) : JSON.stringify(initialValue),
        )
        return initialValue
      }
      return raw ? localStorageValue : JSON.parse(localStorageValue || 'null')
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      const serializedState = raw ? String(state) : JSON.stringify(state)
      localStorage.setItem(key, serializedState)
    } catch {
      //
    }
  })

  return [state, setState]
}

export default useLocalStorage
