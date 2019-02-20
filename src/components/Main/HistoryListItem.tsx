import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { EN, ENGLISH, ESTONIAN } from '../../constants'
import { HistoryContract, Order } from '../../contracts'

export const HistoryListItem: React.FC<{
  history: HistoryContract
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setOrder: (value: Order) => void
}> = ({ history, setSearch, setOrder }): JSX.Element => {
  const [t] = useTranslation()
  const path = `/${history.order.from}/${history.order.to}/${history.term}/`
  const first = history.order.from === EN ? ENGLISH : ESTONIAN
  const second = history.order.to === EN ? ENGLISH : ESTONIAN

  return (
    <div role="listitem" className="item" key={history.time + history.term}>
      <Link
        href={path}
        to={path}
        lang={history.order.from}
        onClick={() => {
          setSearch(history.term)
          setOrder([first, second] as Order)
        }}
      >
        <div className="ui basic horizontal label" style={{ padding: '0.6rem 0.7rem' }}>
          {new Date(history.time).toLocaleString()}
          <div style={{ margin: '0.3rem 0' }}>
            {t(first)} - {t(second)}
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{history.term}</span>
        </div>
      </Link>
    </div>
  )
}
