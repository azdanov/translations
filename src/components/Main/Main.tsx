import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteComponentProps } from 'react-router-dom'
import { Hero, MainPanel, Message, Results, Search } from '.'
import { useDynamicPath, useFetchTranslation, useTitle } from '../../hooks'
import { Article, Order } from '../../contracts'

interface MatchProps {
  word?: string
}

interface Props extends RouteComponentProps<MatchProps> {
  order: Order
  setOrder: (order: Order) => void
}

export const Main: React.FC<Props> = ({
  order,
  setOrder,
  history,
  match: {
    params: { word = '' },
  },
}): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([] as Article[])
  const [error, setError] = useState('')
  const [search, setSearch] = useState(word)
  const [t] = useTranslation()

  useTitle(`${t('home')} | ${t('translations')}`)
  useFetchTranslation(search, order, setResults, setLoading, setError)
  useDynamicPath(order, search, history, setOrder, setSearch, setResults)

  const showResults = (results.length > 0 || loading) && !error
  const displayPanel = !loading && results.length === 0

  return (
    <div className="ui basic segment main">
      <div className="ui basic segment padded">
        <Hero
          order={order}
          setOrder={setOrder}
          setResults={setResults}
          setSearch={setSearch}
        />
      </div>
      <div className="ui centered grid">
        <div className="row searchbar">
          <div className="eight wide computer fourteen wide mobile nine wide tablet column">
            <Search
              loading={loading}
              order={order}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>
        {showResults && (
          <div className="row results">
            <div className="eight wide computer fourteen wide mobile nine wide tablet column">
              <Results
                loading={loading}
                results={results}
                setResults={setResults}
                setSearch={setSearch}
              />
            </div>
          </div>
        )}
        {Boolean(error) && (
          <div className="row message">
            <div className="eight wide computer fourteen wide mobile nine wide tablet column">
              <Message error={error} setError={setError} setSearch={setSearch} />
            </div>
          </div>
        )}
        {displayPanel && (
          <div className="row main-panel">
            <div className="eight wide computer fourteen wide mobile nine wide tablet column">
              <MainPanel setSearch={setSearch} setOrder={setOrder} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Main
