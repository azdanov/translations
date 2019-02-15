import React, { MutableRefObject } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
  setSearch: React.Dispatch<React.SetStateAction<string>>
  searchEl: MutableRefObject<HTMLInputElement | null>
}

export const Message: React.FC<Props> = ({
  error,
  setError,
  setSearch,
  searchEl,
}): JSX.Element => {
  const [t] = useTranslation()

  return (
    <div className="ui warning message">
      <div className="header">{t('error')}</div>
      <div className="content">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="ui floating label right aligned"
          onClick={event => {
            event.preventDefault()
            setError('')
            setSearch('')
            if (searchEl && searchEl.current) {
              searchEl.current.focus()
            }
          }}
        >
          {t('close')}
          <i aria-hidden="true" className="delete icon" />
        </a>
        {t(error)}
      </div>
    </div>
  )
}

export default Message
