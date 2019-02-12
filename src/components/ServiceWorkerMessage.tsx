import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Toast } from './Toast'

export const ServiceWorkerMessage: React.FC = (): JSX.Element => {
  const [t] = useTranslation()
  const [show, setShow] = useState(true)

  return (
    <>{show && <Toast message={t('sw-install')} onConfirm={() => setShow(false)} />}</>
  )
}
