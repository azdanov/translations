import React from 'react'
import { useTranslation } from 'react-i18next'
import { WordOfTheDayResult } from '.'

export const WordOfTheDay: React.FC<{
  result: WordOfTheDayResult
  loading: boolean
}> = ({ result, loading }): JSX.Element => {
  const [t] = useTranslation()

  return loading ? (
    <>
      <h3 className="ui medium header">
        <div className="content">
          <a
            className="word-of-the-day"
            href={`https://www.wordnik.com/words/${result.word}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {result.word}
          </a>
        </div>
        <div className="sub header">{result.note}</div>
      </h3>
      <p>{t('definition')}:</p>
      <div role="list" className="ui bulleted relaxed list">
        {result.definitions.map(definition => (
          <div role="listitem" className="item" key={definition.text}>
            {definition.text}
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="ui placeholder">
      <div className="paragraph">
        <div className="short line" />
        <div className="very short line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
    </div>
  )
}
