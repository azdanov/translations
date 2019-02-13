import { isEmpty } from 'lodash'
import React, { MutableRefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { Header, Icon, Input, Label, List, Segment } from 'semantic-ui-react'
import Article from '../types/Article'
import { ResultsPlaceholder } from './ResultsPlaceholder'

export const Results: React.FC<{
  results?: Article[]
  loading: boolean
  setSearch: (term: string) => void
  setResults: (results: Article[]) => void
  searchEl: MutableRefObject<Input | null>
}> = ({ results, loading, setSearch, setResults, searchEl }): JSX.Element | null => {
  const [t] = useTranslation()

  if (loading) {
    return <ResultsPlaceholder />
  }

  if (!results || isEmpty(results)) {
    return null
  }

  return (
    <>
      <Header as="h2" size="medium" attached="top">
        {t('results')}: {results.length}
      </Header>
      <Segment attached="bottom">
        <Label
          floating
          as="a"
          href="#"
          tabIndex="0"
          className="right aligned"
          onClick={event => {
            event.preventDefault()
            setResults([])
            setSearch('')
            if (searchEl && searchEl.current) {
              searchEl.current.focus()
            }
          }}
        >
          {t('close results')}
          <Icon name="delete" />
        </Label>
        <List relaxed>
          {results.length &&
            results.map(result => (
              <List.Item lang="en" key={result.en}>
                <List.Header>{result.en}</List.Header>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {result.et.map((et, index, array) => (
                    <span key={et}>
                      <span lang="et">{et}</span>
                      {addSeparator(index < array.length - 1)}
                    </span>
                  ))}
                </div>
              </List.Item>
            ))}
        </List>
      </Segment>
    </>
  )
}

const addSeparator = (add: boolean): JSX.Element | null =>
  add ? (
    <span aria-hidden style={{ userSelect: 'none', margin: '0 0.35em' }}>
      |
    </span>
  ) : null

export default Results
