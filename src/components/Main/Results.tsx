import { isEmpty, isString } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Definition, ResultsPlaceholder } from '.'
import { Article, ArticleEN, ArticleET } from '../../contracts'

export const Results: React.FC<{
  results?: Article[]
  loading: boolean
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setResults: React.Dispatch<React.SetStateAction<Article[]>>
}> = ({ results, loading, setSearch, setResults }): JSX.Element | null => {
  const [t] = useTranslation()
  const [modal, setModal] = useState({ state: false, lang: '', word: '' })

  if (loading) {
    return <ResultsPlaceholder />
  }

  if (!results || isEmpty(results)) {
    return null
  }

  return (
    <>
      {modal.state && (
        <Definition
          close={() => setModal({ state: false, lang: '', word: '' })}
          lang={modal.lang}
          word={modal.word}
        />
      )}
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
          {results.length && results.map(result => createListItem(result, setModal))}
        </div>
      </div>
    </>
  )
}

const createListItem = (
  result: Article,
  setModal: React.Dispatch<
    React.SetStateAction<{ state: boolean; lang: string; word: string }>
  >,
): JSX.Element | null => {
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
            <button
              type="button"
              key={translation}
              lang={order.to}
              className="ui basic label result-translation"
              onClick={() => {
                setModal({ state: true, lang: order.to, word: translation })
              }}
            >
              {translation}
            </button>
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
