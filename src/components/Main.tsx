import React, { useState, useRef } from 'react'
import { Grid, Segment, Input } from 'semantic-ui-react'
import { useFetchTranslation } from '../hooks/useFetchTranslation'
import Article from '../types/Article'
import { Hero } from './Hero'
import { Results } from './Results'
import { Search } from './Search'
import { WordOfTheDay } from './WordOfTheDay'

export const Main: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([] as Article[])
  const [search, setSearch] = useState('')
  const searchEl = useRef<Input>(null)

  useFetchTranslation(search, setResults, setLoading)

  const showResults = results.length > 0 || loading

  return (
    <Segment basic>
      <Hero />
      <Grid centered>
        <Grid.Column mobile={14} tablet={9} computer={8}>
          <Search
            loading={loading}
            search={search}
            setSearch={setSearch}
            searchEl={searchEl}
          />
        </Grid.Column>
        {showResults && (
          <Grid.Row>
            <Grid.Column mobile={14} tablet={9} computer={8}>
              <Results
                searchEl={searchEl}
                loading={loading}
                results={results}
                setSearch={setSearch}
                setResults={setResults}
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
