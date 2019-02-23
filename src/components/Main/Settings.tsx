import localCache from 'lscache'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Settings: React.FC = (): JSX.Element => {
  const [t] = useTranslation()
  const [clear, setClear] = useState(false)
  const [label, setLabel] = useState(false)

  useEffect(() => {
    if (clear) {
      localCache.flush()
      setClear(false)
      setLabel(true)
    }
  }, [clear])

  useEffect(() => {
    const timeout = setTimeout(() => setLabel(false), 3000)
    return () => clearTimeout(timeout)
  }, [label])

  return (
    <div>
      <h3 className="ui header">{t('data')}</h3>
      <p>{t('clear data description')}</p>
      <button
        type="button"
        data-testid="clear-action"
        className="ui basic button"
        onClick={() => setClear(true)}
      >
        <i className="icon erase" />
        {t('clear data')}
      </button>
      {label && (
        <button
          type="button"
          className="ui left pointing green basic label"
          onClick={event => {
            event.currentTarget.blur()
            setLabel(false)
          }}
        >
          {t('success')}
        </button>
      )}
    </div>
  )
}
