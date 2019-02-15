import React from 'react'
import { useTranslation } from 'react-i18next'
import useTitle from '../hooks/useTitle'
import glosbe from '../images/glosbe.png'
import wordnik from '../images/wordnik.png'

export const About: React.FC = (): JSX.Element => {
  const [t] = useTranslation()

  useTitle(`${t('about')} | ${t('translations')}`)

  return (
    <div className="ui centered grid attached about">
      <div className="row">
        <div className="eight wide computer fourteen wide mobile nine wide tablet column">
          <div className="ui basic segment padded">
            <h1 className="ui center aligned header">
              <div className="content">{t('about this')}</div>
            </h1>
          </div>
          <h2 className="ui top attached header">{t('description')}</h2>
          <div className="ui segment bottom attached bg-white">
            <p>{t('about description')}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="eight wide computer fourteen wide mobile nine wide tablet column">
          <h2 className="ui top attached header">{t('disclaimer')}</h2>
          <div className="ui segment bottom attached bg-white">
            <p>{t('about disclaimer')}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="eight wide computer fourteen wide mobile nine wide tablet column">
          <h2 className="ui top attached header">{t('for developer')}</h2>
          <div className="ui segment bottom attached bg-white">
            <p>
              {t('source code')}{' '}
              <a
                href="https://github.com/azdanov/translations"
                rel="noopener noreferrer"
                target="_blank"
              >
                {t('at github')}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="eight wide computer fourteen wide mobile nine wide tablet column">
          <h2 className="ui top attached header">{t('attributions')}</h2>
          <div className="ui basic center aligned padded segment bottom attached bg-white">
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
  )
}

export default About
