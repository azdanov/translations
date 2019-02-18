import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFetchWordOfTheDay } from '../hooks'

export interface WordOfTheDayResult {
  word: string
  note: string
  definitions: { text: string }[]
}

export const WordOfTheDay: React.FC = (): JSX.Element => {
  const [t] = useTranslation()
  const [result, setResult] = useState<WordOfTheDayResult>({
    word: '',
    note: '',
    definitions: [],
  })
  const [loading, setLoading] = useState(false)

  useFetchWordOfTheDay(setResult, setLoading)

  const isReady = !loading && result.word && result.definitions && result.note

  return (
    <>
      <h2 className="ui top attached header">{t('word of the day')}</h2>
      <div className={`ui bottom attached segment ${loading ? 'loading' : ''}`}>
        {isReady ? (
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
        )}
      </div>
    </>
  )
}
