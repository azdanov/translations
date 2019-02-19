import lscache from 'lscache'
import React, { useLayoutEffect, useState } from 'react'
import { HistoryContract, Order } from '../types'
import { HistoryListItem } from './HistoryListItem'
import { HISTORY_KEY } from './Search'

export const History: React.FC<{
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setOrder: (value: Order) => void
}> = ({ setSearch, setOrder }): JSX.Element => {
  const [history, setHistory] = useState([] as HistoryContract[])

  useLayoutEffect(() => {
    setHistory(lscache.get(HISTORY_KEY))
  }, [])

  return (
    <div role="list" className="ui relaxed list history">
      {history &&
        history.map(item => (
          <HistoryListItem
            key={item.time + item.term}
            history={item}
            setSearch={setSearch}
            setOrder={setOrder}
          />
        ))}
    </div>
  )
}
