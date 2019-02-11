import React, { useState } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import { useFetchTranslation } from '../hooks/useFetchTranslation'
import { Article } from '../types/Article'
import { Results } from './Results'
import { Search } from './Search'
import { WordOfTheDay } from './WordOfTheDay'

export const Main: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([] as Article[])
  const [search, setSearch] = useState('')

  useFetchTranslation(search, setResults, setLoading)

  return (
    <Segment basic>
      <Grid centered>
        <Grid.Column mobile={14} tablet={9} computer={8}>
          <Search loading={loading} search={search} setSearch={setSearch} />
        </Grid.Column>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={9} computer={8}>
            <Results loading={loading} results={results} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={9} computer={8}>
            <WordOfTheDay show={results.length === 0} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
