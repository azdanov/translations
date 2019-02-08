import React, { useState, useEffect } from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import { Search } from '../Search/Search'
import { Results } from '../Results/Results'

export const Main: React.FC = (): JSX.Element => {
  const [loading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log(search)
  }, [search])

  return (
    <Segment basic>
      <Grid centered>
        <Grid.Column mobile={14} tablet={9} computer={8}>
          <Search loading={loading} search={search} setSearch={setSearch} />
        </Grid.Column>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={9} computer={8}>
            <Results loading={loading} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
