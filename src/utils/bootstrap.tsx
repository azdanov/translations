import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'
import '@reach/menu-button/styles.css'
import 'fomantic-ui-css/semantic.css'
import '../index.css'
import '../i18n'
import React from 'react'
import { render } from 'react-dom'
import { register } from './serviceWorker'
import { ServiceWorkerMessage } from '../components/ServiceWorkerMessage'

const worker = document.querySelector('#worker') as Element

register({
  onSuccess: () => {
    render(<ServiceWorkerMessage />, worker)
  },
  onUpdate: reg => {
    render(<ServiceWorkerMessage update register={reg} />, worker)
  },
})
