import React, { useState } from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import { Search } from './Search'
import { Results } from './Results'
import { useFetchTranslation } from '../hooks/useFetchTranslation'
import { Result } from './App'

export const Main: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([] as Result[])
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
      </Grid>
    </Segment>
  )
}
