import React, { MutableRefObject } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const Message: React.FC<Props> = ({
  error,
  setError,
  setSearch,
}): JSX.Element => {
  const [t] = useTranslation()

  return (
    <div className="ui warning message">
      <div className="header">{t('error')}</div>
      <div className="content">
        <button
          type="button"
          className="ui floating label right aligned"
          onClick={event => {
            event.preventDefault()
            setError('')
            setSearch('')
          }}
        >
          {t('close')}
          <i aria-hidden="true" className="delete icon" />
        </button>
        {t(error)}
      </div>
    </div>
  )
}
