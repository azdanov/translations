import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Toast } from './Toast'

export const ServiceWorkerMessage: React.FC<{
  update?: boolean
}> = ({ update }): JSX.Element => {
  const [t] = useTranslation()
  const [show, setShow] = useState(true)

  const message = update ? t('sw-update') : t('sw-install')

  return <>{show && <Toast message={message} onConfirm={() => setShow(false)} />}</>
}
