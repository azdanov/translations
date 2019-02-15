import Hidden from '@reach/visually-hidden'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from '../types/Article'
import { Order } from '../types/Languages'

interface Props {
  order: Order
  setOrder: (value: Order) => void
  setResults: React.Dispatch<React.SetStateAction<Article[]>>
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const Hero: React.FC<Props> = ({
  order: [first, second],
  setOrder,
  setResults,
  setSearch,
}): JSX.Element => {
  const [t] = useTranslation()

  return (
    <h1 className="ui center aligned header hero">
      <div className="content">
        <span>{t(first)}</span> - <span>{t(second)}</span>
        <div className="sub header">
          {t('dictionary')}
          <button
            type="button"
            className="ui icon button tertiary"
            onClick={() => {
              setOrder([second, first] as Order)
              setResults([])
              setSearch('')
            }}
          >
            <Hidden>{t('change direction')}</Hidden>
            <i aria-hidden="true" className="exchange icon" />
          </button>
        </div>
      </div>
    </h1>
  )
}

export default Hero
