import React from 'react'
import { useTranslation } from 'react-i18next'
import useTitle from '../hooks/useTitle'
import glosbe from '../images/glosbe.png'
import wordnik from '../images/wordnik.png'

export const About: React.FC = (): JSX.Element => {
  const [t] = useTranslation()

  useTitle(`${t('about')} | ${t('translations')}`)

  return (
    <div className="ui basic segment">
      <div className="ui centered grid">
        <div className="eight wide computer fourteen wide mobile nine wide tablet column">
          <h1 className="ui center aligned header">
            <div className="content">{t('about this')}</div>
          </h1>
        </div>
        <div className="row">
          <div className="eight wide computer fourteen wide mobile nine wide tablet column">
            <p>
              <strong>{t('description')}:</strong> {t('about description')}
            </p>
            <p>
              <strong>{t('disclaimer')}:</strong> {t('about disclaimer')}
            </p>
            <p>
              <strong>{t('for developer')}:</strong>{' '}
              <a
                href="https://github.com/azdanov/translations"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="eight wide computer fourteen wide mobile nine wide tablet column">
            <h2 className="ui large center aligned header">
              <div className="content">{t('attributions')}</div>
            </h2>
            <div className="ui basic center aligned segment">
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="ui medium image"
                href="https://glosbe.com/"
              >
                <img alt="Glosbe Logo" src={glosbe} />
              </a>
              <div className="ui hidden divider" />
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="ui medium image"
                href="https://www.wordnik.com/"
              >
                <img alt="Wordnik Logo" src={wordnik} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
