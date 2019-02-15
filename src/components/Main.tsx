import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useFetchTranslation from '../hooks/useFetchTranslation'
import useLocalStorage from '../hooks/useLocalStorage'
import useTitle from '../hooks/useTitle'
import { Article } from '../types/Article'
import { Order } from '../types/Languages'
import Hero from './Hero'
import Message from './Message'
import Results from './Results'
import Search from './Search'
import WordOfTheDay from './WordOfTheDay'

export const Main: React.FC = (): JSX.Element => {
  const [order, setOrder] = useLocalStorage<Order>('direction', ['english', 'estonian'])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([] as Article[])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [t] = useTranslation()
  const searchEl = useRef<HTMLInputElement>(null)

  useTitle(`${t('home')} | ${t('translations')}`)
  useFetchTranslation(search, order, setResults, setLoading, setError)

  const showResults = (results.length > 0 || loading) && !error

  return (
    <div className="ui basic segment">
      <Hero
        order={order}
        setOrder={setOrder}
        setResults={setResults}
        setSearch={setSearch}
      />
      <div className="ui centered grid">
        <div className="eight wide computer fourteen wide mobile nine wide tablet column">
          <Search
            loading={loading}
            search={search}
            searchEl={searchEl}
            setSearch={setSearch}
          />
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
        <div className="row">
          <div className="eight wide computer fourteen wide mobile nine wide tablet column">
            <WordOfTheDay show={!loading && results.length === 0} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
