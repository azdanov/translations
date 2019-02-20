import { isEmpty, isString } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ResultsPlaceholder } from '.'
import { Article, ArticleEN, ArticleET } from '../../contracts'

export const Results: React.FC<{
  results?: Article[]
  loading: boolean
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setResults: React.Dispatch<React.SetStateAction<Article[]>>
}> = ({ results, loading, setSearch, setResults }): JSX.Element | null => {
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
  const createItem = (
    order: { from: string; to: string },
    from: string,
    to: string[],
  ): JSX.Element => {
    return (
      <div role="listitem" className="item result-item" lang={order.from} key={from}>
        <div className="header listitem">
          <div className="ui basic ribbon label">{from}</div>
        </div>
        <div className="listitem">
          {to.map((translation: string) => (
            <span
              key={translation}
              lang={order.to}
              className="ui basic label result-translation"
            >
              {translation}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (isString(result.en)) {
    const r = result as ArticleEN
    return createItem({ from: 'en', to: 'et' }, r.en, r.et)
  }

  if (isString(result.et)) {
    const r = result as ArticleET
    return createItem({ from: 'et', to: 'en' }, r.et, r.en)
  }

  return null
}
