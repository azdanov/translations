import lscache from 'lscache'
import React, { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HISTORY_KEY } from '../../constants'
import { HistoryContract, Order } from '../../contracts'
import { HistoryListItem } from './HistoryListItem'

export const History: React.FC<{
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setOrder: (value: Order) => void
}> = ({ setSearch, setOrder }): JSX.Element => {
  const [history, setHistory] = useState([] as HistoryContract[])
  const [t] = useTranslation()

  useLayoutEffect(() => {
    setHistory(lscache.get(HISTORY_KEY))
  }, [])

  return !history ? (
    <p>{t('no history')}</p>
  ) : (
    <div role="list" className="ui relaxed list history">
      {history.map(item => (
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
