import { History } from 'history'
import { isEmpty, split, trim } from 'lodash'
import React, { useEffect, useRef } from 'react'
import { languages } from '../i18n'
import { Order } from '../types'
import { choosePath } from '../utils'

export const useDynamicPath = (
  order: Order,
  word: string,
  history: History,
  setOrder: (value: Order) => void,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
): void => {
  const { from, to } = choosePath(order)
  const path = `/${from}/${to}/${word}`
  const pathRef = useRef(path)
  const actionRef = useRef(history.action)

  useEffect(
    function parsePathAndSearch() {
      const isRootLoaded = history.location.pathname === '/' && history.action === 'POP'

      const isNewPathOrAction =
        (pathRef.current !== path && actionRef.current === history.action) ||
        isRootLoaded

      if (isNewPathOrAction) {
        if (isRootLoaded) {
          history.replace(path)
        } else {
          history.push(path)
        }

        setOrder([languages[from], languages[to]] as Order)
        setSearch(word)
        pathRef.current = path
        actionRef.current = history.action
      }
    },
    [order, word],
  )

  useEffect(function handleBackAndForward() {
    const isRemounted = isEmpty(pathRef.current) && !isEmpty(history.location.pathname)

    if (isRemounted) {
      pathRef.current = history.location.pathname
    }

    return history.listen((location, action) => {
      const isManualNavigation =
        pathRef.current !== location.pathname && action === 'POP'

      if (isManualNavigation) {
        const [pathFrom, pathTo, pathWord = ''] = split(
          trim(location.pathname, '/'),
          '/',
        )
        const orderFrom = [languages[pathFrom], languages[pathTo]] as Order

        setOrder(orderFrom)
        setSearch(pathWord)

        pathRef.current = location.pathname
      }
    })
  }, [])
}
