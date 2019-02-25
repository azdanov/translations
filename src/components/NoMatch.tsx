import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Lost } from './Svg'

export const NoMatch: React.FC = (): JSX.Element => {
  const [t] = useTranslation()

  return (
    <div className="ui basic segment no-match">
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
            <p className="no-match__description">
              {t('not found description')}
              <Link href="/" to="/" className="no-match__link">
                {t('home')}
              </Link>
            </p>
          </div>
        </div>
        <div className="row no-match__icon">
          <Lost width="20rem" height="20rem" />
        </div>
      </div>
    </div>
  )
}
