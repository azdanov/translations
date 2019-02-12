import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Toast } from './Toast'

export const ServiceWorkerMessage: React.FC<{
  update?: boolean
  register?: ServiceWorkerRegistration
}> = ({ update, register }): JSX.Element => {
  const [t] = useTranslation()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (!register) return

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })
  }, [])

  return (
    <>
      {show && (
        <Toast
          message={t(update ? 'sw-update' : 'sw-install')}
          button={update ? t('update') : undefined}
          onConfirm={() => {
            setShow(false)
            register && register.waiting && register.waiting.postMessage('skipWaiting')
          }}
        />
      )}
    </>
  )
}

export default ServiceWorkerMessage
