import React, { useRef, useState } from 'react'
import { Grid, Input, Segment } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useFetchTranslation } from '../hooks/useFetchTranslation'
import Article from '../types/Article'
import { Order } from '../types/Languages'
import { Hero } from './Hero'
import { Message } from './Message'
import { Results } from './Results'
import { Search } from './Search'
import { WordOfTheDay } from './WordOfTheDay'
import useTitle from '../hooks/useTitle'

export const Main: React.FC = (): JSX.Element => {
  const [order, setOrder] = useLocalStorage<Order>('direction', ['english', 'estonian'])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([] as Article[])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [t] = useTranslation()
  const searchEl = useRef<Input>(null)

  useTitle(`${t('home')} | ${t('translations')}`)
  useFetchTranslation(search, order, setResults, setLoading, setError)

  const showResults = (results.length > 0 || loading) && !error

  return (
    <Segment basic>
      <Hero
        order={order}
        setOrder={setOrder}
        setResults={setResults}
        setSearch={setSearch}
      />
      <Grid centered>
        <Grid.Column mobile={14} tablet={9} computer={8}>
          <Search
            loading={loading}
            search={search}
            searchEl={searchEl}
            setSearch={setSearch}
          />
        </Grid.Column>
        {showResults && (
          <Grid.Row>
            <Grid.Column mobile={14} tablet={9} computer={8}>
              <Results
                loading={loading}
                results={results}
                searchEl={searchEl}
                setResults={setResults}
                setSearch={setSearch}
              />
            </Grid.Column>
          </Grid.Row>
        )}
        {Boolean(error) && (
          <Grid.Row>
            <Grid.Column mobile={14} tablet={9} computer={8}>
              <Message
                error={error}
                searchEl={searchEl}
                setError={setError}
                setSearch={setSearch}
              />
            </Grid.Column>
          </Grid.Row>
        )}
        <Grid.Row>
          <Grid.Column mobile={14} tablet={9} computer={8}>
            <WordOfTheDay show={!loading && results.length === 0} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default Main
