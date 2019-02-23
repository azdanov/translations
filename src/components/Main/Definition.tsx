import { capitalize } from 'lodash'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useTranslation } from 'react-i18next'
import { useDefinition, useModal } from '../../hooks'

const root = document.querySelector('#modal') as Element

export const Definition: React.FC<{
  close: () => void
  lang: string
  word: string
}> = ({ close, lang, word }): JSX.Element => {
  const [t] = useTranslation()
  const [definitions, setDefinitions] = useState([] as string[])
  const [error, setError] = useState('')

  useModal()
  useDefinition(lang, word, setDefinitions, setError)

  return ReactDOM.createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
    <div className="backdrop" onClick={close}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      <div className="ui tiny modal active" onClick={event => event.stopPropagation()}>
        <i
          tabIndex={0}
          role="button"
          className="close icon"
          onClick={close}
          aria-label={t('close')}
          onKeyDown={event => {
            if (event.key === 'enter') close()
          }}
        />
        <div className="header">
          “{capitalize(word)}” {t('definitions').toLowerCase()}
        </div>
        <div className="scrolling content">
          {definitions && definitions.length > 0 ? (
            <div className="description">
              <div className="ui bulleted list">
                {definitions.map(d => (
                  <p key={d} lang={lang} className="item">
                    {d}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="description">
              {error ? (
                <p>{t(error)}</p>
              ) : (
                <div className="ui active inverted dimmer">
                  <div className="ui loader" />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="actions">
          <button type="button" className="ui button" onClick={close}>
            {t('close')}
          </button>
        </div>
      </div>
    </div>,
    root,
  )
}
