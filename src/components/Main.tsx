import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteComponentProps } from 'react-router-dom'
import useFetchTranslation from '../hooks/useFetchTranslation'
import useTitle from '../hooks/useTitle'
import useDynamicPath from '../hooks/useDynamicPath'
import { Article } from '../types/Article'
import { Order } from '../types/Languages'
import Hero from './Hero'
import Message from './Message'
import Results from './Results'
import Search from './Search'
import WordOfTheDay from './WordOfTheDay'

export const orderKey = 'order'

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
  const searchEl = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([] as Article[])
  const [error, setError] = useState('')
  const [search, setSearch] = useState(word)
  const [t] = useTranslation()

  useTitle(`${t('home')} | ${t('translations')}`)
  useFetchTranslation(search, order, setResults, setLoading, setError)
  useDynamicPath(order, search, history, setOrder, setSearch)

  const showResults = (results.length > 0 || loading) && !error
  const showWordOfTheDay = !loading && results.length === 0

  return (
    <div className="ui basic segment" style={{ marginTop: 0 }}>
      <div className="ui basic segment padded">
        <Hero
          order={order}
          setOrder={setOrder}
          setResults={setResults}
          setSearch={setSearch}
        />
      </div>
      <div className="ui centered grid">
        <div className="row">
          <div className="eight wide computer fourteen wide mobile nine wide tablet column">
            <Search
              loading={loading}
              search={search}
              searchEl={searchEl}
              setSearch={setSearch}
            />
          </div>
        </div>
        {showResults && (
          <div className="row">
            <div className="eight wide computer fourteen wide mobile nine wide tablet column">
              <Results
                loading={loading}
                results={results}
                searchEl={searchEl}
                setResults={setResults}
                setSearch={setSearch}
              />
            </div>
          </div>
        )}
        {Boolean(error) && (
          <div className="row">
            <div className="eight wide computer fourteen wide mobile nine wide tablet column">
              <Message
                error={error}
                searchEl={searchEl}
                setError={setError}
                setSearch={setSearch}
              />
            </div>
          </div>
        )}
        {showWordOfTheDay && (
          <div className="row">
            <div className="eight wide computer fourteen wide mobile nine wide tablet column">
              <WordOfTheDay />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Main
