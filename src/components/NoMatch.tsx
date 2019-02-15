import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const NoMatch: React.FC = (): JSX.Element => {
  const [t] = useTranslation()

  return (
    <div className="ui basic segment">
      <div className="ui centered grid">
        <div className="eight wide computer fourteen wide mobile nine wide tablet column">
          <h1 className="ui center aligned header">
            <div className="content">
              404 <div className="sub header">{t('not found')}</div>
            </div>
          </h1>
        </div>
        <div className="row">
          <div className="eight wide computer fourteen wide mobile nine wide tablet column">
            <p>
              {t('not found description')}
              <Link href="/" to="/">
                {t('home')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoMatch
