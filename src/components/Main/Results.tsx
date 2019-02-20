import { isEmpty, isString } from 'lodash'
import React, { MutableRefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { ResultsPlaceholder } from '.'
import { Article, ArticleEN, ArticleET } from '../../contracts'

export const Results: React.FC<{
  results?: Article[]
  loading: boolean
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setResults: React.Dispatch<React.SetStateAction<Article[]>>
  searchEl: MutableRefObject<HTMLInputElement | null>
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
      <h2 className="ui top attached header">
        {results.length} {t('results found')}
      </h2>
      <div className="ui bottom attached padded segment">
        <button
          type="button"
          className="ui floating label right aligned"
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
          <i aria-hidden="true" className="delete icon" />
        </button>
        <div role="list" className="ui relaxed list" style={{ marginTop: 0 }}>
          {results.length && results.map(createListItem)}
        </div>
      </div>
    </>
  )
}

const createListItem = (result: Article): JSX.Element | null => {
  if (isString(result.en)) {
    const r = result as ArticleEN
    return (
      <div role="listitem" className="item" lang="en" key={r.en}>
        <div className="header listitem">{r.en}</div>
        <div className="listitem" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {r.et.map((et, index, array) => (
            <span key={et}>
              <span lang="et">{et}</span>
              {addSeparator(index < array.length - 1)}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (isString(result.et)) {
    const r = result as ArticleET
    return (
      <div role="listitem" className="item" lang="et" key={r.et}>
        <div className="header listitem">{r.et}</div>
        <div className="listitem" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {r.en.map((en, index, array) => (
            <span key={en}>
              <span lang="et">{en}</span>
              {addSeparator(index < array.length - 1)}
            </span>
          ))}
        </div>
      </div>
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
