import { isEmpty, isString } from 'lodash'
import React, { MutableRefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { Header, Icon, Input, Label, List, Segment } from 'semantic-ui-react'
import Article, { ArticleEN, ArticleET } from '../types/Article'
import { ResultsPlaceholder } from './ResultsPlaceholder'

export const Results: React.FC<{
  results?: Article[]
  loading: boolean
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setResults: React.Dispatch<React.SetStateAction<Article[]>>
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
      <Header as="h2" size="medium" attached="top" style={{ opacity: 0.8 }}>
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
        <List relaxed>{results.length && results.map(createList)}</List>
      </Segment>
    </>
  )
}

const createList = (result: Article): JSX.Element | null => {
  if (isString(result.en)) {
    const r = result as ArticleEN
    return (
      <List.Item lang="en" key={r.en}>
        <List.Header>{r.en}</List.Header>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {r.et.map((et, index, array) => (
            <span key={et}>
              <span lang="et">{et}</span>
              {addSeparator(index < array.length - 1)}
            </span>
          ))}
        </div>
      </List.Item>
    )
  }
  if (isString(result.et)) {
    const r = result as ArticleET
    return (
      <List.Item lang="en" key={r.et}>
        <List.Header>{r.et}</List.Header>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {r.en.map((en, index, array) => (
            <span key={en}>
              <span lang="et">{en}</span>
              {addSeparator(index < array.length - 1)}
            </span>
          ))}
        </div>
      </List.Item>
    )
  }
  return null
}

const addSeparator = (add: boolean): JSX.Element | null =>
  add ? (
    <span aria-hidden style={{ userSelect: 'none', margin: '0 0.35em' }}>
      |
    </span>
  ) : null

export default Results
