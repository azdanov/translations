import { History } from 'history'
import { split, trim, isEmpty } from 'lodash'
import React, { useEffect, useRef } from 'react'
import { languages } from '../i18n'
import { Order } from '../types/Languages'
import choosePath from '../utils/choosePath'

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
        setOrder([languages[from], languages[to]] as Order)
        setSearch(word)
        history.push(path)
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
        // eslint-disable-next-line no-shadow
        const [from, to, word = ''] = split(trim(location.pathname, '/'), '/')
        setOrder([languages[from], languages[to]] as Order)
        setSearch(word)

        pathRef.current = location.pathname
      }
    })
  }, [])
}

export default useDynamicPath
